import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleModel } from '../components/roles/models/role.model';
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

  public createRole(role: RoleModel): Observable<string> {
    const body = JSON.stringify(role);
    return this.http.post<string>(API_URL + 'Role/create-role', body, httpOptions);
  }
}
