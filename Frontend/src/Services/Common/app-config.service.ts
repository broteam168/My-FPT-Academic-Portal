
import { Injectable } from '@angular/core';
import {apiBaseUrl} from '../../assets/configs/app-seting.json';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor() { }

  loadAppConfig() {
    
      this.appConfig = apiBaseUrl;
      return {baseurl : this.appConfig ,
               };
      
  }

  
  get apiBaseUrl() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig;
  }
}