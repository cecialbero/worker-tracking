import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TeamsService } from 'src/app/services/teams.service';
import { Team } from 'src/app/shared/models/team.model';
import { TeamModel } from './models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public team = new TeamModel();
  public teamsResponse = new Array<Team>();

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private teamService: TeamsService,
  ) { }

  deleteTeam(id: string): void {
    this.teamService.deleteTeam(id)
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
        // this.toastrService.error(err.error);
        const validationName = Object.keys(err.error.errors);
        const validationMessage = Object.values(err.error.errors);
        validationName.forEach(errorValitation =>
          this.toastrService.error(
            validationMessage.shift().toString(),
            errorValitation
          ));
      });
  }

  getAll(): Array<Team> {
    this.teamService.getAllTeams()
      .subscribe(data => {
        this.teamsResponse = data;
      }, err => {
        if (!err.error.currentTarget.withCredentials) {
          this.toastrService.warning('😡 Please login 😡');
          this.router.navigate(['']);
        }
      });
    return this.teamsResponse;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
