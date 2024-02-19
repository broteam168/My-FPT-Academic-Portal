import { Component } from '@angular/core';
import { DrawerComponent } from "../../../../Common/drawer/drawer.component";
import { HeaderComponent } from "../../../../Common/header/header.component";
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-detail-subject',
    standalone: true,
    templateUrl: './detail-subject.component.html',
    styleUrl: './detail-subject.component.scss',
    imports: [DrawerComponent, HeaderComponent]
})
export class DetailSubjectComponent {
    menu: any;
    router: Router;
    
}
