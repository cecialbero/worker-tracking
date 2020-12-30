import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { TeamModel } from '../components/teams/models/team.model';
import { BaseResponse } from '../shared/models/base-response.model';
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

  public createTeam(team: TeamModel): Observable<BaseResponse> {
    const body = JSON.stringify(team);
    return this.http.post<BaseResponse>(API_URL + 'Team/create-team', body, httpOptions);
  }

  public deleteTeam(teamId: string): Observable<BaseResponse> {
    const params = new HttpParams().append('teamId', teamId);
    return this.http.delete<BaseResponse>(`${API_URL}Team/delete-team?${params}`, httpOptions);
  }

}
