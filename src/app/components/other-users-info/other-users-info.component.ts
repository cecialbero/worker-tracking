import { Component, OnInit } from '@angular/core';
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

  workers = [
    {
      firstName: 'Bart',
      lastName: 'Samali',
      avatar: null,
      role: 'Project Manager',
      team: ['Tokio', 'Alaska'],
      email: 'bart-samali@companyname.com',
      time: this.currentTime
    },
    {
      firstName: 'John',
      lastName: 'Skyler Moore',
      avatar: 'avatar.png',
      role: 'Full-stack Developer',
      team: ['Tokio'],
      email: 'j-skylermoore@companyname.com',
      time: this.currentTime
    },
    {
      firstName: 'Samantha',
      lastName: 'Lopez Garcia',
      avatar: null,
      role: 'Project Manager',
      team: ['Tokio', 'Alaska', 'Roma'],
      email: 's-lopezgarcia@companyname.com',
      time: this.currentTime
    }
  ];

  status = ['Active', 'Away', 'Offline', 'Busy'];

  constructor(
      public otherUsersInfoService: OtherUsersInfoService
    ) { }

  public getTeamsNames(teams: any): string {
    return teams.map(x => x.name);
  }

  ngOnInit(): void {
    this.otherUsersInfoService.getOtherUsersInfo().subscribe( response => {
      this.otherWorkers = response.data;
    },
    error => {console.log(error);
    });
  }

}
