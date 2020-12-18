import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-users-info',
  templateUrl: './other-users-info.component.html',
  styleUrls: ['./other-users-info.component.scss']
})
export class OtherUsersInfoComponent implements OnInit {

  public currentTime = `${new Date().getDay()}/${new Date().getMonth()} - ${new Date().getHours()}:${new Date().getMinutes()}hs`;

  workers = [
    {
      firstName: 'Bart',
      lastName: 'Samali',
      avatar: null,
      role: 'Project Manager',
      team: ['Tokio', 'Alaska'],
      status: 'Active',
      email: 'bart-samali@companyname.com',
      time: this.currentTime
    },
    {
      firstName: 'John',
      lastName: 'Skyler Moore',
      avatar: 'avatar.png',
      role: 'Full-stack Developer',
      team: ['Tokio'],
      status: 'Active',
      email: 'j-skylermoore@companyname.com',
      time: this.currentTime
    },
    {
      firstName: 'Samantha',
      lastName: 'Lopez Garcia',
      avatar: null,
      role: 'Project Manager',
      team: ['Tokio', 'Alaska', 'Roma'],
      status: 'Offline',
      email: 's-lopezgarcia@companyname.com',
      time: this.currentTime
    }
  ]

  status = ['Active', 'Away', 'Offline', 'Busy'];

  constructor() { }

  ngOnInit(): void {
  }

}
