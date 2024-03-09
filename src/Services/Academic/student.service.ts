import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';
import { Student } from '../../Models/Academic/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  public static currentStudent: Student | null;

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}

  getAllStudent() {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/student');
  }

  getStudentById(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/student/' + id);
  }

  getStudentByUserId(id: any){
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/student/search?userId=' + id);
  }
}
