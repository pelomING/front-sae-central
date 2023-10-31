import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eventos } from '../model/eventos.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

//const API_URL = 'http://localhost:8080/api/reportes/v1';

@Injectable({
    providedIn: 'root'
})
export class EventoService {

    private API_URL = environment.baseUrl + '/api/reportes/v1';
    
    constructor(private http: HttpClient) { }

    getEventos(): Observable<Eventos[]> {
        return this.http.get<Eventos[]>(`${this.API_URL}/alleventos`);
    }

}
