
import { NgModule } from '@angular/core';
import { PrimeNGModule } from '../_primeng/primeng.module';

import { SaeRoutingModule } from './sae-routing.module';

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

import { CommaToDotPipe } from './pipes/comma-to-dot.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    JornadaComponent,
    EventoComponent,
    EstadoResultadoComponent,
    NewEstadoResultadoComponent,
    Detalle_pxqComponent,
    ObservacionesComponent,
    Cobros_adicionalesComponent,
    DescuentosComponent,
    Horas_extrasComponent,
    PersonaComponent,
    CommaToDotPipe
  ],
  imports: [
    PrimeNGModule,
    SaeRoutingModule
  ],
  providers: []
})

export class SaeModule { }
