import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ConfigService {

    //conectar a produccion backend
    //baseUrl: string = 'https://backend-pelom-production.up.railway.app';
    //baseUrl: string = 'https://backend-pelom-desarrollo.up.railway.app';
    //baseUrl: string = 'http://localhost:8080';

    baseUrl: string;

    constructor() {

        this.setBaseUrl();

    }


    private setBaseUrl(): void {

        const currentUrl = window.location.origin;
    
        if (currentUrl === 'https://pelom-ing.up.railway.app') {

          this.baseUrl = 'https://backend-pelom-production.up.railway.app';

        } else if (currentUrl === 'https://pelom-ing-dev.up.railway.app') {

          this.baseUrl = 'https://backend-pelom-desarrollo.up.railway.app';

        } else {

          // Por defecto, utiliza localhost si no coincide con las URL conocidas
          this.baseUrl = 'http://localhost:8080';

        }

      }


}
