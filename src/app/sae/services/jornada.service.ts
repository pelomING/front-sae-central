import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turnos } from '../model/turnos.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

//const API_URL = 'http://localhost:8080/api/reportes/v1';

@Injectable({
    providedIn: 'root'
})
export class JornadaService {

    private API_URL = environment.baseUrl + '/api/reportes/v1';

    constructor(private http: HttpClient) { }
    getJornada(): Observable <Turnos[]> {
        return this.http.get<Turnos[]>(`${this.API_URL}/alljornada`);
    }
}
