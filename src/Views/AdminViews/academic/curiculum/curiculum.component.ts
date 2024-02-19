import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { getMenu } from '../../MenuDrawer';

@Component({
    selector: 'app-curiculum',
    standalone: true,
    templateUrl: './curiculum.component.html',
    styleUrl: './curiculum.component.scss',
    imports: [
        DrawerComponent, 
        HeaderComponent,
        MatIcon
    ]
})
export class CuriculumComponent {
    menu: any;
    router: Router;
    constructor(
        router: Router
    ) {
        this.menu = getMenu('Academic');
        this.router = router;
    }
    goBack() {
        this.router.navigateByUrl('/admin/academic/subject');
    }
}
