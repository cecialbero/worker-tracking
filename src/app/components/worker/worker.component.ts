import { Component, OnDestroy, OnInit } from '@angular/core';

import { WorkerModel } from './models/worker.models';
import { Worker, WorkersResponse } from 'src/app/shared/models/worker.model';
import { WorkerService } from 'src/app/services/worker.service';
import { Team } from 'src/app/shared/models/team.model';
import { TeamsService } from 'src/app/services/teams.service';
import { Role } from 'src/app/shared/models/role.model';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

  public worker = new WorkerModel();
  public workersResponse = new Array<Worker>();
  public filterTerm: string;
  public filter = '';
  public teams = new Array<Team>();
  public roles = new Array<Role>();
  public hasMore = true;
  public currentPage = 1;

  constructor(
    public workerService: WorkerService,
    public teamService: TeamsService,
    public roleService: RolesService,
  ) { }


  getAllWorkers(): Array<Worker> {
    this.workerService.getAllWorkers()
      .subscribe(response => {
        this.workersResponse = response.data;
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
      });
    return this.teams;
  }

  getRoles(): Array<Role> {
    this.roleService.getAllRoles()
      .subscribe(response => {
        this.roles = response;
      });
    return this.roles;
  }

  filterResults(filter: string): void {
    this.workerService.getAllWorkers(filter)
      .subscribe(response => {
        this.workersResponse = response.data;
      });
  }

  loadMore(): void {
    this.workerService.getAllWorkers(undefined, ++this.currentPage)
      .subscribe(response => {
        this.workersResponse.push(...response.data);
        if (!response.data.length) {
          this.hasMore = false;
        }
      });
  }

  private init(): void {
    this.getTeams();
    this.getRoles();
    this.getAllWorkers();
  }

  ngOnInit(): void {
    this.init();

  }


  // print(id: string): void {
  //   console.log(id);
  // }
}
