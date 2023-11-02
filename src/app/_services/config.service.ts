import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    
    baseUrl: string = 'https://backend-pelom-desarrollo.up.railway.app';

    constructor() {

        // if (environment.baseUrl) {
        //     this.baseUrl = environment.baseUrl;
        // } else {
        //     this.baseUrl = process.env['URL_API']; 
        // }

    }

    setBaseUrl(url: string): void {
        this.baseUrl = url;
    }
}
