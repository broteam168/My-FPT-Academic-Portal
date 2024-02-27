import { Component } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { Route, Router } from '@angular/router';
import { getMenu } from '../../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { Subject } from '../../../../../Models';
import { SubjectService } from '../../../../../Services/subject.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { LoadingmodalComponent } from "../../../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../../../Common/messagebox/messagebox.component";
import { Syllabus } from '../../../../../Models/syllabus';
import { SyllabusService } from '../../../../../Services/syllabus.service';

@Component({
    selector: 'app-detail-subject',
    standalone: true,
    templateUrl: './detail-subject.component.html',
    styleUrl: './detail-subject.component.scss',
    imports: [
        DrawerComponent,
        HeaderComponent,
        MatIcon,
        NgClass,
        NgIf,
        CommonModule,
        LoadingmodalComponent,
        MessageboxComponent
    ]
})
export class DetailSubjectComponent {
    menu: any;
    subjectService: SubjectService;
    currentSubject: Subject;
    messageTitle: string;
    messageDescription: string;
    openMessage: boolean;
    openMessage2: boolean;
    fail: boolean;
    loading: boolean;
    navigate: boolean;
    subjectPrerequisite: Subject;
    syllabuses: Syllabus[];
    hasActiveSyllabus: boolean = false;
    constructor(
        subjectService: SubjectService,
        private router: Router,
        private syllabusService: SyllabusService
    ) {
        this.menu = getMenu('Academic'),
        this.subjectService = subjectService;
        this.subjectService.getAllSubject();
        this.subjectService.getSubjectById(router.url.split('/').pop()).subscribe((response) => {
            this.currentSubject = response.data;
            this.subjectService.getSubjectById(this.currentSubject.prerequisite).subscribe(x => {
                this.subjectPrerequisite = x.data;
            });

            this.InitSyllabus();
        });

        
    }

    InitSyllabus() {
        this.syllabusService.getAllSyllabusBySubjId(this.currentSubject.id).subscribe(x => {
            this.syllabuses = x.data;
            this.hasActiveSyllabus = this.syllabuses.some(item => item.active === true);
        });
    }

    goBack() {
        this.router.navigateByUrl('/admin/academic/subject');
    }

    editDetailSubject() {
        this.router.navigateByUrl(this.router.url + '/edit');
    }

    currentId: any;
    deleteSubjectRaw(id: any) {
        this.currentId = id;
        this.openMessage = true;
    }

    close() {
        this.openMessage = false;
    }

    deleteSubject() {
        this.loading = true;
        this.subjectService.deleteSubject(this.currentId).subscribe((data) => {
            if (data['responseCode'] == 200) {
                this.messageTitle = 'Notification';
                this.fail = false;
                this.messageDescription = data['message'];
                this.openMessage2 = true;
                this.navigate = true;
            } else {
                this.messageTitle = 'Error';
                this.fail = true;
                this.messageDescription = data['message'];
                this.openMessage2 = true;
            }
            return data;
        });
        this.close();
    }

    close2() {
        this.openMessage2 = false;
        if (this.navigate == true) {
            this.goBack();
        }
    }

    goToSyllabusManagement() {
        this.router.navigateByUrl(this.router.url + '/syllabus')
    }

}
