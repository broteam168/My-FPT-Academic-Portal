import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserAuth } from '../Models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';
import { appConfig } from '../app/app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static currentUser : UserAuth | null;
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    AuthService.currentUser =JSON.parse(localStorage.getItem('currentUser') || '{}');
    
  }
  public get currentUserValue(): UserAuth | null {
    return AuthService.currentUser;
}

  login(username: string, password: string) {
    this;
    return this.http
      .post<any>(this.configService.apiBaseUrl + `/auth/login`, {
        UserName: username,
        UserPassword: password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          AuthService.currentUser = new UserAuth(user);
          localStorage.setItem('currentUser', JSON.stringify(AuthService.currentUser));
          return user;
        })
      );
  }

  logout() {
    AuthService.currentUser = null; 
    localStorage.removeItem('currentUser');
  }

  verifyRole(role:string) {
   return this.http
      .get<any>(this.configService.apiBaseUrl + '/auth/verify-role?role='+role);
      
  }
}
