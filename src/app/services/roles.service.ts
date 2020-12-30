import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleModel } from '../components/roles/models/role.model';
import { BaseResponse } from '../shared/models/base-response.model';
import { Role } from '../shared/models/role.model';

const API_URL = environment.API_URL;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient) { }

  public getAllRoles(): Observable<Array<Role>> {
    return this.http.get<Array<Role>>(`${API_URL}Role/get-all`);
  }

  public createRole(role: RoleModel): Observable<BaseResponse> {
    const body = JSON.stringify(role);
    return this.http.post<BaseResponse>(API_URL + 'Role/create-role', body, httpOptions);
  }

  public deleteRole(roleId: string): Observable<BaseResponse> {
    const params = new HttpParams().append('roleId', roleId);
    return this.http.delete<BaseResponse>(`${API_URL}Role/delete-role?${params}`, httpOptions);
  }
}
