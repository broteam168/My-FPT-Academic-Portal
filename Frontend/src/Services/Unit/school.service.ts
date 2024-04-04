import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';
import { HttpClient } from '@angular/common/http';
import { School } from '../../Models';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  schools: School[];
  currentSchool:School;
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.getAllSchools();
  }
 
  getCurrentSchool(id: any |undefined)
  {
    return this.http
    .get<any>(this.configService.apiBaseUrl + '/unit/school/'+id)
  }
  getAllSchools() {
    this.http
      .get<any>(this.configService.apiBaseUrl + '/unit/school')
      .subscribe((response) => {
        this.schools = response.data;
      });
  }
  getAllBaseSchools() {
    return this.http
      .get<any>(this.configService.apiBaseUrl + '/unit/school')
      
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
  updateSchool(id:any, newSchool: School) {
    const newObj = Object.fromEntries(
      Object.entries(newSchool).map(([k, v]) => [
        k.charAt(0).toLowerCase() + k.slice(1),
        v,
      ])
    );
    
    return this.http.put<any>(this.configService.apiBaseUrl + '/unit/school/'+id,newObj);
  }
  deleteSchool(id:any) {
    
    return this.http.delete<any>(this.configService.apiBaseUrl + '/unit/school/'+id);
  }
}
