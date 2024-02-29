import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}
  getCourses(param: any) {
    var link = this.configService.apiBaseUrl +
    '/academic/course/search'+ (param==null?'':(''+param));
    return this.http.get<any>(link);
  }
  createCourseByClass(request: any) {
    return this.http.post<any>(
      this.configService.apiBaseUrl +
        '/academic/course' ,
        request
    );
  }
  getCurrentCourse(id:any){
    return this.http.get<any>(
      this.configService.apiBaseUrl +
        '/academic/course/'+id 
    );
  }
  updateCourse(id:any,newCourse:any,convert:boolean){
    return this.http.put<any>(
      this.configService.apiBaseUrl +
        '/academic/course/'+id+'?convert='+convert, newCourse
    );
  }
  deleteCourse(id:any){
    return this.http.delete<any>(
      this.configService.apiBaseUrl +
        '/academic/course/'+id 
    );
  }
}
