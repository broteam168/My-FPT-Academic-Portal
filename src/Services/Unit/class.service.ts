import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
   
  }
  getAlllClasses() {
    return this.http
       .get<any>(this.configService.apiBaseUrl + '/unit/class');
   }
  getClassesById(id:string) {
   return this.http
      .get<any>(this.configService.apiBaseUrl + '/unit/class/search?schoolid='+id);
  }
  getCurrentClass(id:string|undefined)
  {
    return this.http
    .get<any>(this.configService.apiBaseUrl + '/unit/class/'+id)
  }
  createNewClass(newClass: any) {
    return this.http.post<any>(this.configService.apiBaseUrl + '/unit/class',newClass);
  }
  updateClasS(id:number,data:any)
  {
    return this.http.put<any>(this.configService.apiBaseUrl + '/unit/class/'+id,data);
  }
  deleteClass(id:any) {
    
    return this.http.delete<any>(this.configService.apiBaseUrl + '/unit/class/'+id);
  }
}
