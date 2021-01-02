import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WorkersResponse } from 'src/app/shared/models/worker.model';
import { CurrentWorker, WorkerModel } from '../components/worker/models/worker.models';
import { BaseResponse } from '../shared/models/base-response.model';
import { FilterModel } from '../shared/models/filterModel.model';

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

    public getAllWorkers(filter: FilterModel, pageNumber?: number, pageSize?: number): Observable<WorkersResponse> {
      const params = new HttpParams()
        .append('nameToSearch', filter.keyword !== undefined ? filter.keyword : '')
        .append('teamId', filter.team !== undefined ? filter.team : '')
        .append('statusId', filter.status !== undefined ? filter.status : '')
        .append('roleId', filter.role !== undefined ? filter.role : '')
        .append('pageNumber', pageNumber !== undefined ? pageNumber.toString() : '1')
        .append('pageSize', pageSize !== undefined ? pageSize.toString() : DEFAULT_PAGE_SIZE.toString());

      return this.http.get<WorkersResponse>(`${API_URL}Worker/get-all?${params}`);
    }

    public getWorkerByUserName(username: string): Observable<CurrentWorker> {
      return this.http.get<CurrentWorker>(`${API_URL}Worker/get-my-info`);
    }

    public createWorker(worker: WorkerModel): Observable<BaseResponse> {
      return this.http.post<BaseResponse>(API_URL + 'Worker/create-worker', worker, httpOptions);
    }
}
