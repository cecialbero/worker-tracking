import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/identity/token.service';
import { UserService } from 'src/app/services/identity/user.service';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/shared/models/status.model';
import { User } from 'src/app/shared/models/user.model';
import { StatusModel } from './models/status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  public status = new StatusModel();
  public statusList = new Array<Status>();
  private user$: Observable<User>;
  public admin: boolean;
  private currentUser: string;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private statusService: StatusService,
    private tokenService: TokenService,
    private userService: UserService,
  ) { }

  deleteStatus(status: Status): void {
    if (confirm(`Are you sure you want to delete status "${status.statusName}"?`)) {
      this.statusService.deleteStatus(status.statusId.toString())
        .subscribe(result => {
          if (result.commandResponse === null || result.commandResponse === undefined) {
            this.toastrService.info(`${result.infoMessage?.message}`);
          } else {
            this.toastrService.success(`${result.commandResponse}`);
          }
          this.getAll();
        }, err => {
          this.toastrService.error(err.error);
        });
    }
  }

  createStatus(): void {
    this.statusService.createStatus(this.status)
      .subscribe(result => {
        if (result.commandResponse === null || result.commandResponse === undefined) {
          this.toastrService.info(`${result.infoMessage?.message}`);
        } else {
          this.toastrService.success(`${result.commandResponse}`);
        }
        this.getAll();
      }, err => {
        if (err.error?.traceId === undefined) {
          this.toastrService.error(err.error, '🚫Action denied🚫');
        } else {
          const validationName = Object.keys(err.error.errors);
          const validationMessage = Object.values(err.error.errors);
          validationName.forEach(errorValitation =>
            this.toastrService.error(
              validationMessage.shift().toString(),
              errorValitation
            ));
        }
      });
  }

  getAll(): Array<Status> {
    this.statusService.getAllStatus()
      .subscribe(data => {
        this.statusList = data;
      }, err => {
        this.toastrService.warning('400 😥');
        this.router.navigate(['']);
      });
    return this.statusList;
  }

  private getCurrentUserInfo(): void {
    this.user$ = this.userService.getUser();
    this.user$.subscribe(u => {
      this.currentUser = u.email;
      this.admin = 'True' === u.admin;
    });
  }

  ngOnInit(): any {
    this.getCurrentUserInfo();
    this.getAll();
  }

}
