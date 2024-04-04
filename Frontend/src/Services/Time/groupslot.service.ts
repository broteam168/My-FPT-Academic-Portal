import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../Common/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class GroupslotService {

  constructor(private http: HttpClient,
    private configService: AppConfigService) { }
  getAllSets() {
    return this.http
      .get<any>(this.configService.apiBaseUrl + '/time/groupslot');
  }
  createNewGroup(newGroup:any)
  {
    return this.http
      .post<any>(this.configService.apiBaseUrl + '/time/groupslot',newGroup);
  }
  getCurrentGroup(id:string|undefined)
  {
    return this.http
    .get<any>(this.configService.apiBaseUrl + '/time/groupslot/'+id)
  }
  updateGroup(id:string|undefined,updateGroup : any)
  {
    return this.http
    .put<any>(this.configService.apiBaseUrl + '/time/groupslot/'+id,updateGroup)
  }
  deleteGroup(id:string|undefined)
  {
    return this.http
    .delete<any>(this.configService.apiBaseUrl + '/time/groupslot/'+id)
  }
}
