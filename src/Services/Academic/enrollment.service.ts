import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) { }

  getAllEnrollment() {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/enrollment');
  }

  getEnrollmentById(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/enrollment' + id);
  }
  
  getEnrollmentByStudentId(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/enrollment/search?studentId=' + id);
  }

  createEnrollment(newObj: any) {
    return this.http.post<any>(this.configService.apiBaseUrl + '/academic/enrollment', newObj);
  }
}
