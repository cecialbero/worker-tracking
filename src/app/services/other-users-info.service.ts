import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { OtherUsersInfoResponse } from '../components/dashboard/other-users-info/models/other-users-info.model';

const API_URL = environment.API_URL;
const DEFAULT_PAGE_SIZE = environment.DEFAULT_PAGE_SIZE;


@Injectable({
  providedIn: 'root'
})

export class OtherUsersInfoService {

  constructor(
    private http: HttpClient) { }

  public getOtherUsersInfo(): Observable<OtherUsersInfoResponse> {
    return this.http.get<OtherUsersInfoResponse>(`${API_URL}Worker/get-all?PageSize=${DEFAULT_PAGE_SIZE}`);
  }
}
