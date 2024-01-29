import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class MajorService {
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}
  getAllMajors() {
    return this.http
       .get<any>(this.configService.apiBaseUrl + '/major');
   }
}
