import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) {
}
  public getAllStatus(): Observable<Array<Status>> {
    return this.http.get<Array<Status>>(`${API_URL}Status/get-all`);
  }

}
