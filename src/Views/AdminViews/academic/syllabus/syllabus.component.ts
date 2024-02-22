import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from '../../../Common/drawer/drawer.component';
import { HeaderComponent } from '../../../Common/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { getMenu } from '../../MenuDrawer';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SyllabusService } from '../../../../Services/syllabus.service';
import { Syllabus } from '../../../../Models/syllabus';
import { MessageboxComponent } from "../../../Common/messagebox/messagebox.component";
import { LoadingmodalComponent } from "../../../Common/loadingmodal/loadingmodal.component";

@Component({
    selector: 'app-syllabus',
    standalone: true,
    templateUrl: './syllabus.component.html',
    styleUrl: './syllabus.component.scss',
    imports: [DrawerComponent, HeaderComponent, MatIcon, NgIf, NgClass, NgFor, MessageboxComponent, LoadingmodalComponent]
})
export class SyllabusComponent implements OnInit {
  menu: any;
  syllabuses: Syllabus[];
  syllabusService: SyllabusService;
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  navigate: boolean;

  constructor(private router: Router, syllabusService: SyllabusService) {
    this.menu = getMenu('Academic');
    this.syllabusService = syllabusService;
  }
  ngOnInit(): void {
    var temp1 = this.router.url.split('/');
    temp1.pop();
    this.syllabusService.getAllSyllabusBySubjId(temp1.pop()).subscribe((x) => {
      this.syllabuses = x.data;
    });
  }
  goBack() {
    var temp = this.router.url.split('/');
    temp.pop();
    this.router.navigateByUrl(temp.join('/'));
  }
  viewDetailSyllabus(id: number) {
    this.router.navigateByUrl(this.router.url + '/detail/' + id);
  }

  addNewSyllabus() {
    this.router.navigateByUrl(this.router.url + '/add');
  }

  close() {
    this.openMessage = false;
    if (this.navigate == true) {
      location.reload();
    }
  }

  setActiveSyllabus(id: number) {
    this.syllabuses.forEach((x) => {
        console.log(x.id);
      if (x.id == id) {
        x.active = true;
        this.syllabusService.updateSubject(x.id, x).subscribe((data) => {
          if (data['responseCode'] == 200) {
            this.messageTitle = 'Notification';
            this.fail = false;
            this.messageDescription = data['message'];
            this.openMessage = true;
            this.navigate = true;
          } else {
            this.messageTitle = 'Error';
            this.fail = true;
            this.messageDescription = data['message'];
            this.openMessage = true;
          }
          return data;
        });
      } else {
        x.active = false;
        this.syllabusService.updateSubject(x.id, x).subscribe((data) => {
            if (data['responseCode'] == 200) {
              this.messageTitle = 'Notification';
              this.fail = false;
              this.messageDescription = data['message'];
              this.openMessage = true;
              this.navigate = true;
            } else {
              this.messageTitle = 'Error';
              this.fail = true;
              this.messageDescription = data['message'];
              this.openMessage = true;
            }
            return data;
          });
      }
    });
  }
}
