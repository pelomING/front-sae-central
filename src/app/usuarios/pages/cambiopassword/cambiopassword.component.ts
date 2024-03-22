import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StorageService } from 'src/app/_services/storage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiopassword',
  templateUrl: './cambiopassword.component.html',
  styleUrls: ['./cambiopassword.component.scss']
})


export class CambioPasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  loading: boolean = false;

  constructor
    (private fb: FormBuilder,
      private usuarioService: UsuarioService,
      private messageService: MessageService,
      private authService: AuthService,
      public storageService: StorageService,
      private router: Router,
      private confirmationService: ConfirmationService) { }

      
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.passwordValidator()]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }


  passwordValidator() {
    return (control: { value: string; }) => {
      const value = control.value;
      const hasNumber = /[0-9]/.test(value);
      const hasCapital = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const valid = hasNumber && hasCapital && hasLowerCase && hasSpecialCharacter;
      if (!valid) {
        return { invalidPassword: true };
      }
      return null;
    };
  }


  onSubmit() {

    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);


    if (this.changePasswordForm.valid) {

      // Obtener los valores del formulario
      const currentPassword = this.changePasswordForm.get('currentPassword').value;
      const newPassword = this.changePasswordForm.get('newPassword').value;
      const confirmPassword = this.changePasswordForm.get('confirmPassword').value;

      // Verificar si las contraseñas coinciden
      if (newPassword === confirmPassword) {

        // Aquí puedes enviar los datos del formulario al servidor para cambiar la contraseña
        console.log('Formulario válido, datos enviados:', { currentPassword, newPassword });

        // Suscribirse al observable
        this.usuarioService.CambiaPassword(currentPassword, newPassword).subscribe({
          next: (resultado) => {

            // Manejar el resultado exitoso, si es necesario
            console.log('Respuesta del servidor:', resultado);

            this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Contraseña Cambiada', life: 3000 });

            this.showDialog();

            this.cerrarapp();
            
          },
          error: (error) => {
            // Manejar errores
            console.error('Error al cambiar la contraseña:', error);

            this.messageService.add({
              severity: 'info',
              summary: 'Código : ' + error.status,
              detail: 'Por favor, verifique los siguientes datos:' + error.error.message,
            });

          },
          complete: () => {
            // Realizar acciones cuando la operación haya finalizado (opcional)
          }
        });

      } else {
        // Las contraseñas no coinciden, mostrar un mensaje de error
        console.error('Las contraseñas no coinciden.');
      }


    } else {
      // Aquí puedes manejar lo que sucede si el formulario no es válido
      console.log('Formulario inválido');
    }
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
