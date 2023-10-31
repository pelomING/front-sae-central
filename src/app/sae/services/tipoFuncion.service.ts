import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoFuncion } from '../model/tipoFuncion.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

//const API_URL = 'http://localhost:8080/api/mantenedor/v1';

@Injectable({
    providedIn: 'root'
})
export class TipoFuncionService {

    private API_URL = environment.baseUrl + '/api/mantenedor/v1';
  
    constructor(private http: HttpClient) { }
    getTipoFuncions(): Observable <TipoFuncion[]> {
        return this.http.get<TipoFuncion[]>(`${this.API_URL}/findalltipofuncionpersonal`);
    }
}
