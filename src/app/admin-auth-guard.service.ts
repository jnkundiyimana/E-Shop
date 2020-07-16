import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(
    private userService: UserService, 
    private auth: AuthService, 
    private route: Router) { }

  canActivate() {
    return this.auth.appUser$
    .pipe(map(appUser => appUser.isAdmin));
  }
}
