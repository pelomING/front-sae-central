import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
        @Inject(LOCALE_ID) private locale: string) {

        // Cambiar la configuración regional a español
        if (locale === 'es') {
            // Usar configuración regional en español
            document.documentElement.lang = 'es';
        }

    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
