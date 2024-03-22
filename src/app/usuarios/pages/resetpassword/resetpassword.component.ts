import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StorageService } from 'src/app/_services/storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  @ViewChild('dt') table: Table;

  searchTerm: string = '';
  changePasswordForm: FormGroup;
  loading: boolean = false;
  listado_Usuarios: any[];
  cols: any[] = [];

  constructor
    (private fb: FormBuilder,
      private usuarioService: UsuarioService,
      private messageService: MessageService,
      private authService: AuthService,
      public storageService: StorageService,
      private router: Router,
      private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listadoUsuarios();
    this.cols = [
      { field: 'nombre_obra', header: 'Nombre Obra' },
      { field: 'codigo_obra', header: 'Codigo' },
      { field: 'numero_ot', header: 'N° OT' },
      { field: 'monto', header: 'Monto' },
      { field: 'estado.nombre', header: 'Estado' }
    ];
  }

  listadoUsuarios() {
    // Suscribirse al observable
    this.usuarioService.getAllUsuarios().subscribe({
      next: (resultado) => {
        // Manejar el resultado exitoso, si es necesario
        this.listado_Usuarios = resultado;
      },
      error: (error) => {
        // Manejar errores
      }
    });
  }


  resetSearch() {
    this.searchTerm = '';
    this.table.filterGlobal('', 'contains');
  }



  OpenResetPassword(usuario: any) {

    this.confirmationService.confirm({
      message: 'Estás seguro de que deseas resetear password para usuario Id : ' + usuario.id + ' ?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.usuarioService.ResetPassword(usuario.username).subscribe(
          (response) => {
            console.info(response);
            this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Reset Password', life: 3000 });
            this.listadoUsuarios();
            this.resetSearch();
          },
          (ObjError) => {
            // Manejar errores
            console.error('Error :', ObjError);
            this.messageService.add({
              severity: 'info',
              summary: 'Código : ' + ObjError.status,
              detail: ObjError.error.message,
            });
          }
        );

      }
    });

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
