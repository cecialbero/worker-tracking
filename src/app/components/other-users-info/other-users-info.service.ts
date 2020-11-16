import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtherUsersInfoResponse } from './models/other-users-info.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})

export class OtherUsersInfoService {

  constructor(private http: HttpClient) {
  }

  public getOtherUsersInfo(): Observable<OtherUsersInfoResponse> {
    return this.http.get<OtherUsersInfoResponse>(`${API_URL}Worker/get-all`);
  }
}
