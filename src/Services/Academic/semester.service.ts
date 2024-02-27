import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor( private http: HttpClient,
    private configService: AppConfigService) { }
    getAllSemester() {
      return this.http
         .get<any>(this.configService.apiBaseUrl + '/academic/semester');
     }
     createSemester(newSemester : any) {
      return this.http
         .post<any>(this.configService.apiBaseUrl + '/academic/semester',newSemester);
     }
     getCurrentSemester(id : any) {
      return this.http
         .get<any>(this.configService.apiBaseUrl + '/academic/semester/'+id);
     }
     updateSemester(id : any,newSemester:any) {
      return this.http
         .put<any>(this.configService.apiBaseUrl + '/academic/semester/'+id,newSemester);
     }
     deleteSemester(id : any) {
      return this.http
         .delete<any>(this.configService.apiBaseUrl + '/academic/semester/'+id);
     }
}
