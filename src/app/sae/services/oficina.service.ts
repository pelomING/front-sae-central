import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oficina } from '../models/oficina.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

//const API_URL = 'http://localhost:8080/api/mantenedor/v1';

@Injectable({
    providedIn: 'root'
})
export class OficinaService {

    private baseUrl: string = '';
    private UrlApi = '/api/reportes/v1';

    private API_URL = environment.baseUrl + '/api/mantenedor/v1';

    constructor(private http: HttpClient,private configService: ConfigService) 
    { 
        this.baseUrl = this.configService.baseUrl + this.UrlApi;
    }

    getOficinas(): Observable <Oficina[]> {
        return this.http.get<Oficina[]>(`${this.baseUrl}/oficinas`);
    }
}
