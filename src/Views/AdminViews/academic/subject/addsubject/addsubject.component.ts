import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { MatIcon } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../../../../../Services/subject.service';
import { getMenu } from '../../../MenuDrawer';
import { LoadingmodalComponent } from "../../../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../../../Common/messagebox/messagebox.component";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-addsubject',
    standalone: true,
    templateUrl: './addsubject.component.html',
    styleUrl: './addsubject.component.scss',
    imports: [
        DrawerComponent, 
        HeaderComponent, 
        MatIcon, 
        LoadingmodalComponent, 
        MessageboxComponent,
        ReactiveFormsModule,
        NgIf
    ]
})
export class AddsubjectComponent{
    menu: any;
    subjectForm: FormGroup;
    router: Router;
    messageTitle: string;
    messageDescription: string;
    openMessage: boolean;
    fail: boolean;
    loading: boolean;
    navigate: boolean;

    constructor(
        private subjectService: SubjectService,
        router: Router,
        private formBuilder: FormBuilder
    ) {
        this.menu = getMenu('Academic');
        this.router = router;
        this.subjectForm = this.formBuilder.group({
            subjectCode: ['', Validators.required],
            name: ['', Validators.required],
            type: ['', Validators.required],
            status: [true],
            description: ['', Validators.required],
            credits: ['', Validators.required],
            prerequisite: [''],
        });
    }

    goBack() {
        this.router.navigateByUrl('/admin/academic/subject');
    }

    close() {
        this.openMessage = false;
        if (this.navigate == true) {
            this.goBack();
        }
    }

    createSubject() {
        if (this.subjectForm.valid) {
            this.loading = true;
            var newSubject = this.subjectForm.getRawValue();
            this.subjectService.createNewSubject(newSubject).subscribe(data => {
                if (data['responseCode'] == 200) {
                    this.messageTitle = 'Notification';
                    this.fail = false;
                    this.messageDescription = data['message'];
                    this.openMessage = true;
                    this.navigate = true;
                } 
                else {
                    this.messageTitle = 'Error';
                    this.fail = true;
                    this.messageDescription = data['message'];
                    this.openMessage = true;
                }
                return data;
            })
        }
        else {
            this.messageTitle = 'Error Occur';
            this.fail = true;
            this.messageDescription = 'Please enter full information to continue';
            this.openMessage = true;
        }
        this.loading = false;
    }
}
