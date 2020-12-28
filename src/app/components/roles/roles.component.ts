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

  createRole(): void {
    console.log(this.role);
    this.roleService.createRole(this.role)
      .subscribe(result => {
        console.log(result);
        this.getAll();
      });
  }

  getAll(): Array<Role> {
    this.roleService.getAllRoles()
      .subscribe(data => {
        this.rolesResponse = data;
        console.log(this.rolesResponse);
      });
    return this.rolesResponse;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
