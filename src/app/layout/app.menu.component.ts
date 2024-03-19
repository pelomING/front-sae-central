import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PrimeIcons } from 'primeng/api';
import { StorageService } from '../auth/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})

export class AppMenuComponent implements OnInit {

  model: any[] = [];
  panelMenuItems: any[] = [];


  constructor(public layoutService: LayoutService,
    private storageService: StorageService) { }

      ngOnInit() {

        let user = this.storageService.getUser();

        this.model = user.menu

        this.panelMenuItems = user.menu

      }
 
}
