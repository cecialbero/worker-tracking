import { Component, OnInit } from '@angular/core';

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
    public teamService: TeamsService,
  ) { }

  createTeam(): void {
    console.log(this.team);
    this.teamService.createTeam(this.team)
      .subscribe(result => {
        console.log(result);
        this.getAll();
      });
  }

  getAll(): Array<Team> {
    this.teamService.getAllTeams()
      .subscribe(data => {
        this.teamsResponse = data;
        console.log(this.teamsResponse);
      });
    return this.teamsResponse;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
