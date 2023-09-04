import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoFuncion } from '../model/tipoFuncion.model';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/mantenedor/v1';

@Injectable({
    providedIn: 'root'
})
export class TipoFuncionService {
    constructor(private http: HttpClient) { }
    getTipoFuncions(): Observable <TipoFuncion[]> {
        return this.http.get<TipoFuncion[]>(`${API_URL}/findalltipofuncionpersonal`);
    }
}
