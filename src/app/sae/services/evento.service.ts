import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eventos } from '../model/eventos.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

//const API_URL = 'http://localhost:8080/api/reportes/v1';

@Injectable({
    providedIn: 'root'
})
export class EventoService {

    private baseUrl: string = '';
    private UrlApi = '/api/reportes/v1';

    private API_URL = environment.baseUrl + '/api/reportes/v1';
    
    constructor(private http: HttpClient,private configService: ConfigService) 
    { 
        this.baseUrl = this.configService.baseUrl + this.UrlApi;
    }

    getEventos(): Observable<Eventos[]> {
        return this.http.get<Eventos[]>(`${this.baseUrl}/alleventos`);
    }

}
