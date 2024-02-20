import { Component } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { Route, Router } from '@angular/router';
import { getMenu } from '../../../MenuDrawer';
import { MatIcon } from '@angular/material/icon';
import { Subject } from '../../../../../Models';
import { SubjectService } from '../../../../../Services/subject.service';
import { NgClass, NgIf } from '@angular/common';
import { LoadingmodalComponent } from "../../../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../../../Common/messagebox/messagebox.component";

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
        LoadingmodalComponent,
        MessageboxComponent
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
    navigate: boolean;
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
}
