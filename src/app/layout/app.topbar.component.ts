import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
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
    public storageService: StorageService,
    private router: Router,
    public layoutService: LayoutService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }



  logout() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas cerrar la aplicación?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Cerrando...', life: 3000 });
        
        this.showDialog();
        this.cerrarapp();
      }
    });
  }


  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }


  cerrarapp() {

    setTimeout(() => {

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

    }, 1000);

  }



}
