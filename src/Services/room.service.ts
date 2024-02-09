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
}
