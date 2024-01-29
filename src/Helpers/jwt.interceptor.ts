
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../Services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        this.authenticationService.refreshToken();
        let currentUser = this.authenticationService.currentUserValue;
         
        if (currentUser && currentUser.token) {
        
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET',
                     'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return next.handle(request);
    }
}