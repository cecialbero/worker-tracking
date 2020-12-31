import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/identity/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.user$ = userService.getUser();
  }

  openUserOptions(): void {
    const userOptions = document.querySelector('header ul');
    userOptions.classList.toggle('open-menu');
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }
}
