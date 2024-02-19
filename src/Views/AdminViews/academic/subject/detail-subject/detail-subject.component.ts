import { Component } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { Route, Router } from '@angular/router';
import { getMenu } from '../../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { Subject } from '../../../../../Models';
import { SubjectService } from '../../../../../Services/subject.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-detail-subject',
    standalone: true,
    templateUrl: './detail-subject.component.html',
    styleUrl: './detail-subject.component.scss',
    imports: [
        DrawerComponent, 
        HeaderComponent,
        MatIcon,
        NgClass
    ]
})
export class DetailSubjectComponent {
    menu: any;
    subjectService: SubjectService
    currentSubject: Subject;
    messageTitle: string;
    messageDescription: string;
    openMessage: boolean;
    openMessage2: boolean;
    fail: boolean;
    loading: boolean;
    naviage:boolean;
    constructor(
        subjectService: SubjectService,
        private router: Router
    ) {
        this.menu = getMenu('Academic'),
        this.subjectService = subjectService;
        this.subjectService.getAllSubject();
        this.subjectService.getSubjectById(router.url.split('/').pop()).subscribe((response) => {
            this.currentSubject = response.data;
        });
    }

    goBack() {
        this.router.navigateByUrl('/admin/academic/subject');
    }
}
