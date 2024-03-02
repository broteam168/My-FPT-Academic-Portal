import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}
  getSession(param: any) {
    var link = this.configService.apiBaseUrl +
    '/time/session/search'+ (param==null?'':(''+param));
    return this.http.get<any>(link);
  }
  createSession(body:any) {
    var link = this.configService.apiBaseUrl +
    '/time/session';
    return this.http.post<any>(link,body);
  }
}
