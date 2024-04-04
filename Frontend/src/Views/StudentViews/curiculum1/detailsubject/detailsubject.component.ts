import { Component } from '@angular/core';
import { DrawerComponent } from "../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../Common/header/header.component";
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SubjectService } from '../../../../Services/Academic/subject.service';
import { SyllabusService } from '../../../../Services/Academic/syllabus.service';
import { getMenu } from '../../MenuDrawer';
import { Subject } from '../../../../Models';
import { Syllabus } from '../../../../Models/syllabus';

@Component({
    selector: 'app-detailsubject',
    standalone: true,
    templateUrl: './detailsubject.component.html',
    styleUrl: './detailsubject.component.scss',
    imports: [
        DrawerComponent, 
        HeaderComponent,
        MatIcon,
        CommonModule
    ]
})
export class DetailsubjectComponent {
    menu: any;
    currentSubject: Subject;
    subjectPrerequisite: Subject;
    syllabuses: Syllabus[];
    hasActiveSyllabus: boolean = false;
    constructor(
        private router: Router,
        private subjectService: SubjectService,
        private syllabusService: SyllabusService
    ) {
        this.menu = getMenu('Curriculum');

        this.subjectService.getAllSubject();
        this.subjectService.getSubjectById(router.url.split('/').pop()).subscribe((response) => {
            this.currentSubject = response.data;
            this.subjectService.getSubjectById(this.currentSubject.prerequisite).subscribe(x => {
                this.subjectPrerequisite = x.data;
            });

            this.InitSyllabus();
        });
    }

    goBack() {
        var temp = this.router.url.split('/');
        temp.pop();
        temp.pop();
        temp.pop();
        this.router.navigateByUrl(temp.join('/'));
    }

    InitSyllabus() {
        this.syllabusService.getAllSyllabusBySubjId(this.currentSubject.id).subscribe(x => {
            this.syllabuses = x.data;
            this.hasActiveSyllabus = this.syllabuses.some(item => item.active === true);
        });
    }
}
