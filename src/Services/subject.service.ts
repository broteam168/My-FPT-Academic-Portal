import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) { }

  getSubjectById(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/subject/' + id);
  }

  getAllSubject() {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/subject');
  }

  createNewSubject(newObj: any) {
    return this.http.post<any>(this.configService.apiBaseUrl + '/academic/subject', newObj);
  }

  deleteSubject(id: any) {
    return this.http.delete<any>(this.configService.apiBaseUrl + '/academic/subject/' + id);
  }
}
