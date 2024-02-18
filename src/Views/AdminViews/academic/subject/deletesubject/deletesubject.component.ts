import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { getMenu } from '../../../MenuDrawer';
import { NgFor } from '@angular/common';
import { SubjectService } from '../../../../../Services/subject.service';
import { Subject } from '../../../../../Models';

@Component({
    selector: 'app-deletesubject',
    standalone: true,
    templateUrl: './deletesubject.component.html',
    styleUrl: './deletesubject.component.scss',
    imports: [
        DrawerComponent, 
        HeaderComponent, 
        MatIcon,
        NgFor
    ]
})
export class DeletesubjectComponent implements OnInit{
    menu: any;
    router: Router;
    subjects: Subject[];
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


}
