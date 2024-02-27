import { Component } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { getMenu } from '../../../MenuDrawer';
import { LoadingmodalComponent } from "../../../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../../../Common/messagebox/messagebox.component";
import { SyllabusService } from '../../../../../Services/syllabus.service';
import { Syllabus } from '../../../../../Models/syllabus';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-detailsyllabus',
    standalone: true,
    templateUrl: './detailsyllabus.component.html',
    styleUrl: './detailsyllabus.component.scss',
    imports: [
        DrawerComponent,
        HeaderComponent,
        MatIcon,
        NgIf,
        NgClass,
        LoadingmodalComponent,
        MessageboxComponent
    ]
})
export class DetailsyllabusComponent {
    menu: any;
    syllabusService: SyllabusService;
    currentSyllabus: Syllabus;
    messageTitle: string;
    messageDescription: string;
    openMessage: boolean;
    openMessage2: boolean;
    fail: boolean;
    loading: boolean;
    navigate: boolean;
    constructor (
        private router: Router,
        syllabusService: SyllabusService
    ) {
        this.menu = getMenu('Academic'),
        this.syllabusService = syllabusService;
        this.syllabusService.getSyllabusById(router.url.split('/').pop()).subscribe((response) => {
            this.currentSyllabus = response.data;
        });
    }
    goBack() {
        var temp = this.router.url.split('/');
        temp.pop();
        temp.pop();
        this.router.navigateByUrl(temp.join('/'));
    }

    currentId: any;
    deleteSyllabusRaw(id: any) {
        this.currentId = id;
        this.openMessage = true;
    }

    close() {
        this.openMessage = false;
    }

    deleteSubject() {
        this.loading = true;
        this.syllabusService.deleteSyllabus(this.currentId).subscribe((data) => {
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

    editDetailSyllabus() {
        this.router.navigateByUrl(this.router.url + '/edit');
    }
}
