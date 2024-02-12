import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([

            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
                canActivate: [PublicGuard],
                canMatch: [PublicGuard]
            },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },

                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                   
                    { path: 'jornada', loadChildren: () => import('./sae/components/jornada/jornada.module').then(m => m.JornadaModule) },
                    { path: 'evento', loadChildren: () => import('./sae/components/evento/evento.module').then(m => m.EventoModule) },
                    { path: 'persona', loadChildren: () => import('./sae/components/persona/persona.module').then(m => m.PersonaModule) },
                    { path: 'estado', loadChildren: () => import('./sae/components/estadoResultado/estadoresultado.module').then(m => m.EstadoResultadoModule) },
                    { path: 'NewEstado', loadChildren: () => import('./sae/components/newEstadoResultado/newestadoresultado.module').then(m => m.NewEstadoResultadoModule) },
                    
                    
                    { path: 'detallepxq', loadChildren: () => import('./sae/components/detalle_pxq/detalle_pxq.module').then(m => m.Detalle_pxqModule) },

                    { path: 'observaciones', loadChildren: () => import('./sae/components/observaciones/observaciones.module').then(m => m.ObservacionesModule) },

                    { path: 'cobros_adicionales', loadChildren: () => import('./sae/components/cobros_adicionales/cobros_adicionales.module').then(m => m.Cobros_adicionalesModule) },

                    { path: 'descuentos', loadChildren: () => import('./sae/components/descuentos/descuentos.module').then(m => m.DescuentosModule) },

                    { path: 'horas_extras', loadChildren: () => import('./sae/components/horas_extras/horas_extras.module').then(m => m.Horas_extrasModule ) },


                    {
                      path: 'obras',
                      loadChildren: () => import('./obras/obras.module').then(m => m.ObrasModule),
                    },
                    
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

                ],                       
                canActivate: [ AuthGuard ],
                canMatch: [ AuthGuard ]
            },
            
            { path: 'auth2', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
