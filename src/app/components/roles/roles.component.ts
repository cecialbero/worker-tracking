import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/identity/token.service';
import { UserService } from 'src/app/services/identity/user.service';

import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { RoleModel } from './models/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public role = new RoleModel();
  public roleList = new Array<Role>();
  private user$: Observable<User>;
  public admin: boolean;
  private currentUser: string;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private roleService: RolesService,
    private tokenService: TokenService,
    private userService: UserService,
  ) { }

  deleteRole(role: Role): void {
    if (confirm(`Are you sure you want to delete role "${role.roleName}"?`)) {
      this.roleService.deleteRole(role.roleId.toString())
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

  createRole(): void {
    this.roleService.createRole(this.role)
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

  private getCurrentUserInfo(): void {
    this.user$ = this.userService.getUser();
    this.user$.subscribe(u => {
      this.currentUser = u.email;
      this.admin = 'True' === u.admin;
    });
  }

  getAll(): Array<Role> {
    this.roleService.getAllRoles()
      .subscribe(data => {
        this.roleList = data;
      }, err => {
        this.toastrService.warning('400 😥');
        this.router.navigate(['']);
      });
    return this.roleList;
  }

  ngOnInit(): any {
    this.getCurrentUserInfo()
    this.getAll();
  }

}
