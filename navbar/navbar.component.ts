import { AppUser } from './../models/app-user';
import { UserService } from './../user.service';
import { AdminAuthGuardService } from './../admin-auth-guard.service';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  appUser: AppUser;

  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser=appUser);
  }

  logout() {
    this.auth.logout();
  }
}
