import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ConfigService {
    
    baseUrl: string = 'https://backend-pelom-production.up.railway.app';
 
    //baseUrl: string = 'https://backend-pelom-desarrollo.up.railway.app';
 
    //baseUrl: string = 'http://localhost:8080';
 
}
