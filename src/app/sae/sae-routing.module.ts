import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent  } from './pages/dashboard/dashboard.component';
import { JornadaComponent } from './pages/jornada/jornada.component';
import { EventoComponent } from './pages/evento/evento.component';
import { EstadoResultadoComponent } from './pages/estadoResultado/estadoresultado.component';
import { NewEstadoResultadoComponent } from './pages/newEstadoResultado/newestadoresultado.component';
import { Detalle_pxqComponent } from './pages/detalle_pxq/detalle_pxq.component';
import { ObservacionesComponent } from './pages/observaciones/observaciones.component';
import { Cobros_adicionalesComponent } from './pages/cobros_adicionales/cobros_adicionales.component';
import { DescuentosComponent  } from './pages/descuentos/descuentos.component';
import { Horas_extrasComponent } from './pages/horas_extras/horas_extras.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { StorageService } from '../_services/storage.service';

const rutas = new StorageService();
console.log('rutas:',rutas.getUser());

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'jornada', component: JornadaComponent },
      { path: 'evento', component: EventoComponent },
      { path: 'estado', component: EstadoResultadoComponent },
      { path: 'NewEstado', component: NewEstadoResultadoComponent },
      { path: 'detallepxq', component: Detalle_pxqComponent },
      { path: 'observaciones', component: ObservacionesComponent },
      { path: 'cobros_adicionales', component: Cobros_adicionalesComponent },
      { path: 'descuentos', component: DescuentosComponent },
      { path: 'horas_extras', component: Horas_extrasComponent },
      { path: 'persona', component: PersonaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SaeRoutingModule {

 }
