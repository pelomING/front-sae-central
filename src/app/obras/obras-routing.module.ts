import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ObrasPageComponent } from './pages/obras-page/obras-page.component';
import { MaterialesPageComponent } from './pages/materiales-page/materiales-page.component';

import { AgendasPageComponent } from './pages/agenda-page/agendas/agendas-page.component';
import { AgendaObraPageComponent } from './pages/agenda-page/agenda-obra/agenda-obra-page.component';


import { ReportediarioPageComponent } from './pages/reportediario-page/reportediario-page.component';
import { ReportediarioporobraPageComponent } from './pages/reportediario-page/reportediarioporobra/reportediarioporobra-page.component';


import { MaterialesfaltantesPageComponent } from './pages/materialesfaltantes-page/materialesfaltantes-page.component';
import { CuadraturamaterialesPageComponent } from './pages/cuadraturamateriales-page/cuadraturamateriales-page.component';
import { EstadopagoPageComponent } from './pages/estadopago-page/estadopago-page.component';
import { EstadoobraPageComponent } from './pages/estadoobra-page/estadoobra-page.component';

// localhost:4200/obras
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: ObrasPageComponent },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'materiales', component: MaterialesPageComponent },
      
      { path: 'agendas', component: AgendasPageComponent },
      { path: 'agenda-obra', component: AgendaObraPageComponent },
      
      { path: 'reportediario', component: ReportediarioPageComponent },
      { path: 'reportediarioporobra', component: ReportediarioporobraPageComponent },


      { path: 'materialesfaltantes', component: MaterialesfaltantesPageComponent },
      { path: 'cuadraturamateriales', component: CuadraturamaterialesPageComponent },
      { path: 'estadopago', component: EstadopagoPageComponent },
      { path: 'estadoobra', component: EstadoobraPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ObrasRoutingModule { }
