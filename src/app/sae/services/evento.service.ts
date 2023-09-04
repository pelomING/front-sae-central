import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '../model/evento.model';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/reportes/v1';

@Injectable({
    providedIn: 'root'
})
export class EventoService {
    constructor(private http: HttpClient) { }
    getEventos(): Observable <Evento[]> {
        return this.http.get<Evento[]>(`${API_URL}/alleventos`);
    }
}
