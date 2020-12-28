import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { TeamModel } from '../components/teams/models/team.model';
import { Team } from '../shared/models/team.model';

const API_URL = environment.API_URL;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private http: HttpClient) { }

  public getAllTeams(): Observable<Array<Team>> {
    return this.http.get<Array<Team>>(`${API_URL}Team/get-all`);
  }

  public createTeam(team: TeamModel): Observable<string> {
    const body = JSON.stringify(team);
    return this.http.post<string>(API_URL + 'Team/create-team', body, httpOptions);
  }

}
