import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WorkersResponse } from 'src/app/shared/models/worker.model';

const API_URL = environment.API_URL;
const DEFAULT_PAGE_SIZE = environment.DEFAULT_PAGE_SIZE;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(
    private http: HttpClient) { }

    public getAllWorkers(filter?: string, pageNumber?: number, pageSize?: number): Observable<WorkersResponse> {
      const params = new HttpParams()
        .append('nameToSearch', filter !== undefined ? filter : '')
        .append('pageNumber', pageNumber !== undefined ? pageNumber.toString() : '1')
        .append('pageSize', pageSize !== undefined ? pageSize.toString() : DEFAULT_PAGE_SIZE.toString());

      return this.http.get<WorkersResponse>(`${API_URL}Worker/get-all?${params}`);
    }

    public createWorker(): void {
      const pepe = 1;
    }
}
