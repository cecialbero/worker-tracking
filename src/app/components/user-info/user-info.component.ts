import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  worker = {
    firstName: 'Bart',
    lastName: 'Samali',
    avatar: 'avatar.png',
    role: 'Project Manager',
    team: ['Tokio', 'Alaska'],
    email: 'bart-samali@companyname.com'
  }

  status = ['Active', 'Away', 'Offline', 'Busy'];

  constructor() { }

  ngOnInit(): void {
  }

}
