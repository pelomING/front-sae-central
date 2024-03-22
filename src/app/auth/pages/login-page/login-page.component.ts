import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from '../../interfaces/user.interface';



// Función para validar letras, números y guion bajo
function validateUsername(control: AbstractControl): { [key: string]: any } | null {
  const pattern = /^[a-zA-Z0-9-]+$/;
  if (!pattern.test(control.value)) {
    return { invalidUsername: true };
  }
  return null;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login2-component.html',
  styleUrls: ['./login2-component.scss'],
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }`]
})

export class LoginPageComponent {


  spinnerStyles = {
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)'
  };



  errorMessage = '';
  loginForm: FormGroup;

  valCheck: string[] = ['remember'];

  password!: string;

  loading = false;
  cargar = false;



  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    public layoutService: LayoutService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(12), validateUsername]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
    
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


  mostrarGuardar: boolean = true;
  mostrarCargando: boolean = false;

  async onLogin(): Promise<void> 
  {

    this.loading = true;

    this.mostrarGuardar = false;

    this.mostrarCargando = true;


      if (this.loginForm.valid) {

        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;

        this.authService.login(username, password)
          .subscribe({
            next: data => {

              if(data.roles[0] !==  'ROLE_TECNICOSAE' )
              {

                this.loading = false;
                
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Bienvenido', life: 2000 })
                this.storageService.saveUser(data);


                console.log('data',data)


                setTimeout(() => {
                  this.router.navigate(['/']);
                }, 2000);

              }else{

                this.messageService.add({ severity: 'error', summary: 'Error en la solicitud.', detail: 'Usuario no autorizado.', life: 2000 });
                this.loading = false;
                this.mostrarGuardar = true;
                this.mostrarCargando = false;

              }

            },
            error: err => {

              this.messageService.add({ severity: 'error', summary: 'Error en la solicitud.', detail: err, life: 2000 });
              this.loading = false;
              this.mostrarGuardar = true;
              this.mostrarCargando = false;

            }
          })

      }

  }

}
