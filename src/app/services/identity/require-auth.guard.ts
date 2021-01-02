import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequireAuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isLogged()) {
      this.toastrService.warning('Please Login', '🚫Unauthorized🚫');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
