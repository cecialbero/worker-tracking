import { Component, OnInit } from '@angular/core';
import { OtherUsersInfoService } from 'src/app/services/other-users-info.service';
import { WorkerInfo, OtherUsersInfoResponse } from './models/other-users-info.model';
import { Status } from 'src/app/shared/models/status.model';
import { StatusService } from 'src/app/services/status.service';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-other-users-info',
  templateUrl: './other-users-info.component.html',
  styleUrls: ['./other-users-info.component.scss']
})
export class OtherUsersInfoComponent implements OnInit {

  public currentTime = `${new Date().getDay()}/${new Date().getMonth()} - ${new Date().getHours()}:${new Date().getMinutes()}hs`;
  public otherWorkersInfo: Array<WorkerInfo>;
  public statusList = new Array<Status>();

  status = ['Active', 'Away', 'Offline', 'Busy'];

  constructor(
    public otherUsersInfoService: OtherUsersInfoService,
    public statusService: StatusService,
  ) { }

  public getTeamsNames(teams: Array<Team>): string {
    const result = teams.map(x => x.name).join(', ');
    return result;
  }

  public getAllStatus(): Array<Status> {
    this.statusService.getAllStatus().subscribe(response => {
      return response.map(x => x.statusName);
    },
    error => {
      console.log(error);
    });
    return this.statusList;
  }

  ngOnInit(): void {
    this.otherUsersInfoService.getOtherUsersInfo().subscribe( response => {
      this.otherWorkersInfo = response.data;
      console.log(this.otherWorkersInfo);
    },
    error => {
      console.log(error);
    });
  }
}
