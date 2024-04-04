import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';
import { Curiculum } from '../../Models/curiculum';

@Injectable({
  providedIn: 'root'
})
export class CuriculumService {

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) { }

  getCuriculumBySubMajorId(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/curiculum/search?subMajorId=' + id);
  }

  getCuriculumById(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/curiculum/' + id);
  }

  deleteCuriculum(id: any) {
    return this.http.delete<any>(this.configService.apiBaseUrl + '/academic/curiculum/' + id);
  }

  createCuriculum(newObj: any) {
    return this.http.post<any>(this.configService.apiBaseUrl + '/academic/curiculum', newObj);
  }

  getSubjectByCuriculum(id: any) {
    return this.http.get<any>(this.configService.apiBaseUrl + '/academic/curiculum/searchSubject?subjectId=' + id);
  }

  updateCuriculum(id: any, newCuriculum: Curiculum) {
    return this.http.put<any>(this.configService.apiBaseUrl + '/academic/curiculum/' + id, newCuriculum);
  }
}
