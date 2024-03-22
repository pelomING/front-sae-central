import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotfoundComponent } from './notfound/notfound.component';

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
                    
                    {
                      path: 'sae',
                      loadChildren: () => import('./sae/sae.module').then(m => m.SaeModule),
                    },
                    {
                      path: 'obras',
                      loadChildren: () => import('./obras/obras.module').then(m => m.ObrasModule),
                    },
                    {
                      path: 'usuarios',
                      loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
                    }

                ],                       
                canActivate: [ AuthGuard ],
                canMatch: [ AuthGuard ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
