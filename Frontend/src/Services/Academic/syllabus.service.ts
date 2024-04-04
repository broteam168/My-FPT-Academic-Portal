import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';
import { Syllabus } from '../../Models/syllabus';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}
  getAllSyllabusBySubjId(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/syllabus/search?subjectId=' + id);
  } 

  getSyllabusById(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/syllabus/' + id);
  }

  deleteSyllabus(id: any) {
    return this.http.delete<any>(this.configService.apiBaseUrl + '/academic/syllabus/' + id);
  } 

  updateSubject(id: any, newSyllabus: Syllabus) {
    return this.http.put<any>(this.configService.apiBaseUrl + '/academic/syllabus/' + id, newSyllabus);
  }

  createNewSyllabus(newObj: any) {
    return this.http.post<any>(this.configService.apiBaseUrl + '/academic/syllabus', newObj);
  }

  setActiceSyllabus(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/syllabus/' + id + '/active');
  }

  setDeacticeSyllabus(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/syllabus/' + id + '/deactive');
  }
}
