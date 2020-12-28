import { Component, OnInit } from '@angular/core';

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
    public roleService: RolesService,
  ) { }

  deleteRole(id: string): void {
    this.roleService.deleteRole(id)
    .subscribe(result => {
      console.log(result);
      this.getAll();
    });
  }

  createRole(): void {
    this.roleService.createRole(this.role)
      .subscribe(result => {
        this.getAll();
      });
  }

  getAll(): Array<Role> {
    this.roleService.getAllRoles()
      .subscribe(data => {
        this.rolesResponse = data;
      });
    return this.rolesResponse;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
