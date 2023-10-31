import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oficina } from '../model/oficina.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

//const API_URL = 'http://localhost:8080/api/mantenedor/v1';

@Injectable({
    providedIn: 'root'
})
export class OficinaService {

    private API_URL = environment.baseUrl + '/api/mantenedor/v1';

    constructor(private http: HttpClient) { }
    getOficinas(): Observable <Oficina[]> {
        return this.http.get<Oficina[]>(`${this.API_URL}/oficinas`);
    }
}
