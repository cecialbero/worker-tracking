import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
  ) { }

  signup(user: User): Observable<string> {
    return this.http.post<string>(`${API_URL}v1/identity/register`, user);
  }

  verifyTakenEmail(email: string): Observable<boolean> {
    const params = new HttpParams().append('email', email);
    return this.http.get<boolean>(`${API_URL}v1/identity/verify?${params}`);
  }
}
