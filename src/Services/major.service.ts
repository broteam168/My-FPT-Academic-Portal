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
  ) {
  }
  getAllMajors() {
    return this.http
       .get<any>(this.configService.apiBaseUrl + '/major');
   }
   createNewMajor(newObj: any) {
    
    return this.http.post<any>(this.configService.apiBaseUrl + '/major',newObj);
  }
  getSpecificMajor(id:any)
  {
    return this.http
       .get<any>(this.configService.apiBaseUrl + '/major/'+id);
  }
  updateMajor(id:any, newMajor: any) {
    return this.http.put<any>(this.configService.apiBaseUrl + '/major/'+id,newMajor);
  }
  deleteMajor(id:any) {
    
    return this.http.delete<any>(this.configService.apiBaseUrl + '/major/'+id);
  }
}
