import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/shared/models/status.model';
import { StatusModel } from './models/status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  public status = new StatusModel();
  public statusResponse = new Array<Status>();

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private statusService: StatusService,
  ) { }

  deleteStatus(id: string): void {
    this.statusService.deleteStatus(id)
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
        // this.toastrService.error(err.error);
        const validationName = Object.keys(err.error.errors);
        const validationMessage = Object.values(err.error.errors);
        validationName.forEach(errorValitation =>
          this.toastrService.error(
            validationMessage.shift().toString(),
            errorValitation
          ));
      });
  }

  getAll(): Array<Status> {
    this.statusService.getAllStatus()
      .subscribe(data => {
        this.statusResponse = data;
      }, err => {
        if (!err.error.currentTarget.withCredentials) {
          this.toastrService.warning('😡 Please login 😡');
          this.router.navigate(['']);
        }
      });
    return this.statusResponse;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
