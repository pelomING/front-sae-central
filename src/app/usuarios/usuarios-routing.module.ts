import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { CambioPasswordComponent } from './pages/cambiopassword/cambiopassword.component';
import { ResetPasswordComponent } from './pages/resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: CambioPasswordComponent },
      { path: 'cambiopassword', component: CambioPasswordComponent },
      { path: 'persona', component: PersonaComponent },
      { path: 'resetpassword', component: ResetPasswordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsuariosRoutingModule { }
