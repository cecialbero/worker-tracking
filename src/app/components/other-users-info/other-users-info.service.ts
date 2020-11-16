import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtherUsersInfoResponse } from './models/other-users-info.model';
import { Observable } from 'rxjs/internal/Observable';

const API_URL = 'https://localhost:44351/api/';

@Injectable({
  providedIn: 'root'
})

export class OtherUsersInfoService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line: typedef
  public getOtherUsersInfo(): Observable<OtherUsersInfoResponse> {
    return this.http.get<OtherUsersInfoResponse>(`${API_URL}Worker/get-all`);
  }
}
