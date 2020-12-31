import { Component, OnInit } from '@angular/core';

import { WorkerModel } from './models/worker.models';
import { Worker } from 'src/app/shared/models/worker.model';
import { WorkerService } from 'src/app/services/worker.service';
import { Team } from 'src/app/shared/models/team.model';
import { TeamsService } from 'src/app/services/teams.service';
import { Role } from 'src/app/shared/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

  public workerForm: FormGroup;
  public photoFile: File;
  public worker = new WorkerModel();
  public workersResponse = new Array<Worker>();
  public filterTerm: string;
  public filter = '';
  public teams = new Array<Team>();
  public roles = new Array<Role>();
  public hasMore = true;
  public currentPage = 1;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private workerService: WorkerService,
    private teamService: TeamsService,
    private roleService: RolesService,
  ) { }


  getAllWorkers(): Array<Worker> {
    this.workerService.getAllWorkers()
      .subscribe(response => {
        this.workersResponse = response.data;
      }, err => {
        if (err.status === 401) {
          this.toastrService.warning('😡 Please login 😡', '🚫Unauthorized🚫');
        } else {
          this.toastrService.warning('400 😥');
        }
        this.router.navigate(['']);
      });
    return this.workersResponse;
  }

  public concatNames(teams: Array<Team>): string {
    return teams.map(x => x.name).join(', ');
  }

  getTeams(): Array<Team> {
    this.teamService.getAllTeams()
      .subscribe(response => {
        this.teams = response;
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
    return this.teams;
  }

  getRoles(): Array<Role> {
    this.roleService.getAllRoles()
      .subscribe(response => {
        this.roles = response;
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
    return this.roles;
  }

  filterResults(filter: string): void {
    this.workerService.getAllWorkers(filter)
      .subscribe(response => {
        this.workersResponse = response.data;
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
  }

  loadMore(): void {
    this.workerService.getAllWorkers(undefined, ++this.currentPage)
      .subscribe(response => {
        this.workersResponse.push(...response.data);
        if (!response.data.length) {
          this.hasMore = false;
        }
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
  }

  private init(): void {
    this.getTeams();
    this.getRoles();
    this.getAllWorkers();
  }

  ngOnInit(): void {
    this.init();
    this.workerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  upload(): void {
    const firstName = this.workerForm.get('firstName').value;
    console.log(`firstName ${firstName}`);

    const lastName = this.workerForm.get('lastName').value;
    console.log(`lastName ${lastName}`)

    const email = this.workerForm.get('firstName').value;
    console.log(`email ${email}`)

    console.log(this.photoFile);
  }

}
