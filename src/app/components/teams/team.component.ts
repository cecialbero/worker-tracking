import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/identity/token.service';
import { UserService } from 'src/app/services/identity/user.service';

import { TeamsService } from 'src/app/services/teams.service';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { TeamModel } from './models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public team = new TeamModel();
  public teamList = new Array<Team>();
  private user$: Observable<User>;
  public admin: boolean;
  private currentUser: string;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private teamService: TeamsService,
    private tokenService: TokenService,
    private userService: UserService,
  ) { }

  deleteTeam(team: Team): void {
    if (confirm(`Are you sure you want to delete team "${team.name}"?`)) {
      this.teamService.deleteTeam(team.teamId)
        .subscribe(result => {
          if (result.commandResponse === null || result.commandResponse === undefined) {
            this.toastrService.info(`${result.infoMessage?.message}`);
          } else {
            this.toastrService.success(`${result.commandResponse}`);
          }
          this.getAll();
        }, err => {
          this.toastrService.error(err.error);
        });
    }
  }

  createTeam(): void {
    this.teamService.createTeam(this.team)
      .subscribe(result => {
        if (result.commandResponse === null || result.commandResponse === undefined) {
          this.toastrService.info(`${result.infoMessage?.message}`);
        } else {
          this.toastrService.success(`${result.commandResponse}`);
        }
        this.getAll();
      }, err => {
        if (err.error?.traceId === undefined) {
          this.toastrService.error(err.error, '🚫Action denied🚫');
        } else {
          const validationName = Object.keys(err.error.errors);
          const validationMessage = Object.values(err.error.errors);
          validationName.forEach(errorValitation =>
            this.toastrService.error(
              validationMessage.shift().toString(),
              errorValitation
            ));
        }
      });
  }

  getAll(): Array<Team> {
    this.teamService.getAllTeams()
      .subscribe(data => {
        this.teamList = data;
      }, err => {
        this.toastrService.warning('400 😥');
        this.router.navigate(['']);
      });
    return this.teamList;
  }

  private getCurrentUserInfo(): void {
    this.user$ = this.userService.getUser();
    this.user$.subscribe(u => {
      this.currentUser = u.email;
      this.admin = 'True' === u.admin;
    });
  }

  ngOnInit(): any {
    this.getCurrentUserInfo();
    this.getAll();
  }

}
