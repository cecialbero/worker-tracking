import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private toastrService: ToastrService,
  ) { }

  // tslint:disable-next-line: typedef
  login(email: string, password: string) {
    return this.http.post(
      `${API_URL}v1/identity/login`,
      { email, password },
      { observe: 'response' }
    )
      .pipe(tap(res => {
        // tslint:disable-next-line: no-string-literal
        const authToken = res.body['token'];
        this.userService.setToken(authToken);
        this.toastrService.info(`Welcome ${email} :)`);
      }));
  }
}
