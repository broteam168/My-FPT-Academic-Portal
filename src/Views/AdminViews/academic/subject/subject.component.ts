import { Component, OnInit } from "@angular/core";
import { getMenu } from "../../MenuDrawer";
import { DrawerComponent, HeaderComponent } from "../../../Common";
import { MatIcon } from "@angular/material/icon";
import { Subject } from "../../../../Models";
import { SubjectService } from "../../../../Services/subject.service";
import { Router } from "@angular/router";
import { NgClass, NgFor } from "@angular/common";


@Component({
  selector: 'app-academic',
  standalone: true,
  imports: [
    DrawerComponent, 
    HeaderComponent,
    MatIcon, 
    NgFor,
    NgClass
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
})
export class SubjectComponent implements OnInit{
  menu: any;
  subjects: Subject[]
  constructor(private subjectService: SubjectService, private router: Router) {
    this.menu = getMenu('Academic');
    
    this.router = router;
  }
  ngOnInit(): void {
      this.subjectService.getAllSubject().subscribe((x) => {
        this.subjects = x.data;
      });
  }
  getAllSubject() {
    return this.subjects;
  }
  addSubject() {
    this.router.navigate([this.router.url + '/add']);
  }
  deleteSubject() {
    this.router.navigate([this.router.url + '/delete']);
  }
  goBack() {
    this.router.navigateByUrl('/admin/academic');
  }
  goToCuriculum() {
    this.router.navigate([this.router.url + '/curiculum']);
  }
  viewDetailSubject(id: any) {
    this.router.navigate([this.router.url + '/detail/' + id]);
  }
}