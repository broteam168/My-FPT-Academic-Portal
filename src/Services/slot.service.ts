import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private http: HttpClient,
    private configService: AppConfigService) { }
  getSlotsById(id:string) {
    return this.http
       .get<any>(this.configService.apiBaseUrl + '/time/slot/search?groupId='+id);
   }
   createSlot(newSlot:any) {
    return this.http
       .post<any>(this.configService.apiBaseUrl + '/time/slot',newSlot);
   }
   getSpecificSlot(id:any)
  {
    return this.http
       .get<any>(this.configService.apiBaseUrl + '/time/slot/'+id);
  }
  updateSlot(id:any, newSlot: any) {
    return this.http.put<any>(this.configService.apiBaseUrl +  '/time/slot/'+id,newSlot);
  }
}
