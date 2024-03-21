
import { NgModule } from '@angular/core';
import { PrimeNGModule } from '../_primeng/primeng.module';

import { ObrasRoutingModule } from './obras-routing.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';


/* Dashboard */
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

import { UsoSistemaComponent } from './pages/usosistema/usosistema.component';

/* Listado de Obras */
import { ObrasPageComponent } from './pages/obras-page/obras-page.component';


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

/* Cierre de Obra */
import { CierrePageComponent } from './pages/cierre-page/cierre-page.component';

/* Gestion Estados de Pago */
import { GestionEDPPageComponent } from './pages/gestionedp-page/gestionedp-page.component';

import { ManualUsuarioComponent } from './pages/manualusuario-page/manualusuario-page.component';


/* Estado Pago */
import { EstadopagoPageComponent } from './pages/estadopago-page/estadopago-page.component';
import { HistoricoEstadoPagoPageComponent } from './pages/estadopago-page/historicoestadopagoobras/historicoestadopago-page.component';
import { SelecionarReportediarioporobraPageComponent } from './pages/estadopago-page/selecionarreportesdiarios/selecionarreportediarioporobra-page.component';


/* Estado Obra */
import { EstadoobraPageComponent } from './pages/estadoobra-page/estadoobra-page.component';
import { GenerarEstadoPagoObrasPageComponent } from './pages/estadopago-page/generarestadopagoobras/generarestadopagoobras-page.component';

import { CommaToDotPipe } from './pipes/comma-to-dot.pipe';

import { ProductService } from 'src/app/obras/services/productservice';


@NgModule({
  declarations: [
    LayoutPageComponent,
    DashboardPageComponent,
    UsoSistemaComponent,
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
    EstadoobraPageComponent,
    CierrePageComponent,
    GestionEDPPageComponent,
    ManualUsuarioComponent,
    SelecionarReportediarioporobraPageComponent,
    CommaToDotPipe
  ],
  imports: [
    PrimeNGModule,
    ObrasRoutingModule
  ],
  providers: [ProductService]
})

export class ObrasModule { }
