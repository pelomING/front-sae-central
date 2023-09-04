import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jornada } from '../model/jornada.model';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/reportes/v1';

@Injectable({
    providedIn: 'root'
})
export class JornadaService {
    constructor(private http: HttpClient) { }
    getJornada(): Observable <Jornada[]> {
        return this.http.get<Jornada[]>(`${API_URL}/alljornada`);
    }
}
