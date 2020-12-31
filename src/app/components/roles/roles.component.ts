import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/shared/models/role.model';
import { RoleModel } from './models/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public role = new RoleModel();
  public rolesResponse = new Array<Role>();

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private roleService: RolesService,
  ) { }

  deleteRole(id: string): void {
    this.roleService.deleteRole(id)
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
          this.toastrService.error(err.error, '🚫Permission🚫');
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

  getAll(): Array<Role> {
    this.roleService.getAllRoles()
      .subscribe(data => {
        this.rolesResponse = data;
      }, err => {
        if (err.status === 401) {
          this.toastrService.warning('😡 Please login 😡', '🚫Unauthorized🚫');
        } else {
          this.toastrService.warning('400 😥');
        }
        this.router.navigate(['']);
      });
    return this.rolesResponse;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
