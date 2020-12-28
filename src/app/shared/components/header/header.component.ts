import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openUserOptions(): void {
    const userOptions = document.querySelector('header ul');
    userOptions.classList.toggle('open-menu');
  }

}
