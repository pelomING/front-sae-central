import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oficina } from '../model/oficina.model';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/mantenedor/v1';

@Injectable({
    providedIn: 'root'
})
export class OficinaService {
    constructor(private http: HttpClient) { }
    getOficinas(): Observable <Oficina[]> {
        return this.http.get<Oficina[]>(`${API_URL}/oficinas`);
    }
}
