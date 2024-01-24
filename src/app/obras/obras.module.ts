
import { NgModule } from '@angular/core';
import { PrimeNGModule } from '../_primeng/primeng.module';
import { NgxPrintModule } from 'ngx-print';


import { ObrasRoutingModule } from './obras-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';


/* Dashboard */
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

/* Listado de Obras */
import { ObrasPageComponent } from './pages/obras-page/obras-page.component';
import { ProductService } from './services/productservice';

/* Materiales Obras */
import { MaterialesPageComponent } from './pages/materiales-page/materiales-page.component';

/* Agenda */
import { AgendasPageComponent } from './pages/agenda-page/agendas/agendas-page.component';
import { AgendaObraPageComponent } from './pages/agenda-page/agenda-obra/agenda-obra-page.component';


/* Reporte Diario */
import { ReportediarioPageComponent } from './pages/reportediario-page/reportediario-page.component';
import { ReportediarioporobraPageComponent } from './pages/reportediario-page/reportediarioporobra/reportediarioporobra-page.component';


/* Informe Materiales Faltantes*/ 
import { MaterialesfaltantesPageComponent } from './pages/materialesfaltantes-page/materialesfaltantes-page.component';

/* Informe de Cuadratura de Materiales */
import { CuadraturamaterialesPageComponent } from './pages/cuadraturamateriales-page/cuadraturamateriales-page.component';
 
/* Estado Pago */
import { EstadopagoPageComponent } from './pages/estadopago-page/estadopago-page.component';
import { HistoricoEstadoPagoPageComponent } from './pages/estadopago-page/historicoestadopagoobras/historicoestadopago-page.component';


/* Estado Obra */
import { EstadoobraPageComponent } from './pages/estadoobra-page/estadoobra-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GenerarEstadoPagoObrasPageComponent } from './pages/estadopago-page/generarestadopagoobras/generarestadopagoobras-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    DashboardPageComponent,
    ObrasPageComponent,
    MaterialesPageComponent,
    AgendasPageComponent,
    AgendaObraPageComponent,
    ReportediarioPageComponent,
    ReportediarioporobraPageComponent,
    MaterialesfaltantesPageComponent,
    CuadraturamaterialesPageComponent,
    EstadopagoPageComponent,
    HistoricoEstadoPagoPageComponent,
    GenerarEstadoPagoObrasPageComponent,
    EstadoobraPageComponent
  ],
  imports: [
    PrimeNGModule,
    ObrasRoutingModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  providers: [ ProductService]
})

export class ObrasModule { }
