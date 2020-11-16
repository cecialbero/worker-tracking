import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/shared/models/status.model';
import { StatusService } from 'src/app/shared/services/status.service';
import { Data, OtherUsersInfoResponse } from './models/other-users-info.model';
import { OtherUsersInfoService } from './other-users-info.service';

@Component({
  selector: 'app-other-users-info',
  templateUrl: './other-users-info.component.html',
  styleUrls: ['./other-users-info.component.scss']
})
export class OtherUsersInfoComponent implements OnInit {

  public currentTime = `${new Date().getDay()}/${new Date().getMonth()} - ${new Date().getHours()}:${new Date().getMinutes()}hs`;
  public otherWorkers: Data[];
  public statusList = new Array<Status>();

  status = ['Active', 'Away', 'Offline', 'Busy']; // TODO:connect service

  constructor(
      public otherUsersInfoService: OtherUsersInfoService,
      public statusService: StatusService,
    ) { }

  public getTeamsNames(teams: any): string {
    return teams.map(x => x.name);
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
    // this.getAllStatus();
    this.otherUsersInfoService.getOtherUsersInfo().subscribe( response => {
      this.otherWorkers = response.data;
    },
    error => {
      console.log(error);
    });
  }

}
