import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../model/persona.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

//const API_URL = 'http://localhost:8080/api/mantenedor/v1';

@Injectable({
    providedIn: 'root'
})
export class PersonaService {

    private API_URL = environment.baseUrl + '/api/mantenedor/v1';

    constructor(private http: HttpClient) { }
    async getPersonas(): Promise<Observable<Persona[]>> {
        return this.http.get<Persona[]>(`${this.API_URL}/findallpersonas`);
    }

    creaPersona(persona: Persona): Observable <Persona> {
        return this.http.post<Persona>(`${this.API_URL}/creapersona`, persona);
    }
}
