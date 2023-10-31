import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';
import { StorageService } from '../auth/services/storage.service';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router,
        public layoutService: LayoutService) { }


    logout(): void {
        this.authService.logout().subscribe({
          next: res => {
            console.log(res);
            this.storageService.clean();
            this.router.navigate(['/auth']);
          },
          error: err => {
            console.log(err);
          }
        });
      }
      
}
