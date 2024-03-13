import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HomeComponent } from './home/home.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { EstadoResultadoService } from 'src/app/sae/services/estadoResultado.service';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // importa la localización que necesitas
import { PrimeNGModule } from './_primeng/primeng.module';

registerLocaleData(localeEs);

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, HomeComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        PrimeNGModule
    ],
    providers: [
        httpInterceptorProviders,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, EstadoResultadoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
