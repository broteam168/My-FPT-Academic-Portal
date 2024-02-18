import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
  
  }
  getRoomsById(id:string) {
    return this.http
       .get<any>(this.configService.apiBaseUrl + '/unit/room/search?schoolid='+id);
   }
   createNewRoom(newRoom: any) {
    return this.http.post<any>(this.configService.apiBaseUrl + '/unit/room',newRoom);
  }
  getCurrentRoom(id:string|undefined)
  {
    return this.http
    .get<any>(this.configService.apiBaseUrl + '/unit/room/'+id)
  }
  updateRoom(id:number,data:any)
  {
    return this.http.put<any>(this.configService.apiBaseUrl + '/unit/room/'+id,data);
  }
  deleteRoom(id:any) {
    
    return this.http.delete<any>(this.configService.apiBaseUrl + '/unit/room/'+id);
  }
}
