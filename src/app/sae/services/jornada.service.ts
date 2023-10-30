import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turnos } from '../model/turnos.model';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/reportes/v1';

@Injectable({
    providedIn: 'root'
})
export class JornadaService {
    constructor(private http: HttpClient) { }
    getJornada(): Observable <Turnos[]> {
        return this.http.get<Turnos[]>(`${API_URL}/alljornada`);
    }
}
