import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { getMenu } from '../../../MenuDrawer';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SubjectService } from '../../../../../Services/Academic/subject.service';
import { Subject } from '../../../../../Models';
import { MessageboxComponent } from "../../../../Common/messagebox/messagebox.component";
import { LoadingmodalComponent } from "../../../../Common/loadingmodal/loadingmodal.component";

@Component({
    selector: 'app-deletesubject',
    standalone: true,
    templateUrl: './deletesubject.component.html',
    styleUrl: './deletesubject.component.scss',
    imports: [
        DrawerComponent,
        HeaderComponent,
        MatIcon,
        NgFor,
        NgClass,
        NgIf,
        MessageboxComponent,
        LoadingmodalComponent
    ]
})
export class DeletesubjectComponent implements OnInit{
    menu: any;
    router: Router;
    subjects: Subject[];
    openMessage: boolean;
    messageTitle: string;
    messageDescription: string;
    fail: boolean;
    navigate: boolean;
    openMessage2: boolean;
    loading: boolean;

    constructor(
        private subjectService: SubjectService,
        router: Router
    ) {
        this.menu = getMenu('Academic');
        this.router = router;
    }
    ngOnInit(): void {
        this.subjectService.getAllSubject().subscribe((x) => {
            this.subjects = x.data;
        })
    }

    goBack() {
        this.router.navigateByUrl('/admin/academic/subject');
    }

    getAllSubject() {
        return this.subjects;
    }

    currentId: any;
    deleteSubjectRaw(id:any) {
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
            location.reload();
        }
    }
}
