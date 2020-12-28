import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { StatusModel } from '../components/status/models/status.model';
import { Status } from '../shared/models/status.model';

const API_URL = environment.API_URL;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class StatusService {

  constructor(private http: HttpClient) {
}
  public getAllStatus(): Observable<Array<Status>> {
    return this.http.get<Array<Status>>(`${API_URL}Status/get-all`);
  }

  public createStatus(status: StatusModel): Observable<string> {
    const body = JSON.stringify(status);
    return this.http.post<string>(API_URL + 'Status/create-status', body, httpOptions);
  }
}
