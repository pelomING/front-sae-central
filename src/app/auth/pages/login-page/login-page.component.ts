import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';


import { LayoutService } from 'src/app/layout/service/app.layout.service';


// Función para validar letras, números y guion bajo
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
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class LoginPageComponent {

  errorMessage = '';
  loginForm: FormGroup;

  valCheck: string[] = ['remember'];

  password!: string;


  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    public layoutService: LayoutService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.loginForm = this.fb.group({
      username: ['test_admin', [Validators.required, Validators.maxLength(12), validateUsername]],
      password: ['test_admin', [Validators.required, Validators.maxLength(12), validateUsername]]
    });
  }


  async onLogin(): Promise<void> {

    if (this.loginForm.valid) {

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login(username, password)
        .subscribe({
          next: data => {
            this.storageService.saveUser(data);
            this.router.navigate(['/']);
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
    }

  }

}
