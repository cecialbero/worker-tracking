import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  login(email: string, password: string) {
    return this.http.post(
      `${API_URL}v1/identity/login`,
      { email, password },
      { observe: 'response' }
    )
      .pipe(tap(res => {
        const authToken = res.body['token'];
        this.userService.setToken(authToken);
        console.log(`User ${email} auth with token =>  ${authToken}`);
      }));
  }
}
