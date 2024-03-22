
import { NgModule } from '@angular/core';
import { PrimeNGModule } from '../_primeng/primeng.module';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { LayoutComponent } from './pages/layout/layout.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { CambioPasswordComponent } from './pages/cambiopassword/cambiopassword.component';
import { ResetPasswordComponent } from './pages/resetpassword/resetpassword.component';


@NgModule({
  declarations: [
    LayoutComponent,
    CambioPasswordComponent,
    PersonaComponent,
    ResetPasswordComponent
  ],
  imports: [
    PrimeNGModule,
    UsuariosRoutingModule
  ],
  providers: []
})

export class UsuariosModule { }
