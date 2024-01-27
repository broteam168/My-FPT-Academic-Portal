import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';
import { School } from '../Models';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  schools: School[];
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.getAllSchools();
  }
  getAllSchools() {
    this.http
      .get<any>(this.configService.apiBaseUrl + '/unit/school')
      .subscribe((response) => {
        this.schools = response.data;
      });
  }
  createNewSchool(newSchool: School) {
    const newObj = Object.fromEntries(
      Object.entries(newSchool).map(([k, v]) => [
        k.charAt(0).toLowerCase() + k.slice(1),
        v,
      ])
    );
    
    return this.http.post<any>(this.configService.apiBaseUrl + '/unit/school',newObj);
  }
}
