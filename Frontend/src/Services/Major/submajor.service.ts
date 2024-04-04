import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';
import { Major } from '../../Models';

@Injectable({
  providedIn: 'root',
})
export class SubmajorService {
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}
  getAllSubMajor() {
    return this.http.get<any>(this.configService.apiBaseUrl + '/submajor');
  }

  getSubMajorInMajor(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/submajor/search?majorId=' + id);
  }
  createNewSubMajor(newClass: any) {
    return this.http.post<any>(this.configService.apiBaseUrl + '/submajor',newClass);
  }
  updateSubMajor(id:any,newClass: any) {
    return this.http.put<any>(this.configService.apiBaseUrl + '/submajor/'+id,newClass);
  }
  getSpecificSubMajor(id:any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/submajor/'+id);
  }
  deleteClass(id:any) {
    
    return this.http.delete<any>(this.configService.apiBaseUrl + '/submajor/'+id);
  }
}
