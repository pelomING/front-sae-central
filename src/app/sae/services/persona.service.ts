import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/persona.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

//const API_URL = 'http://localhost:8080/api/mantenedor/v1';

@Injectable({
    providedIn: 'root'
})
export class PersonaService {

    private baseUrl: string = '';
    private UrlApi = '/api/mantenedor/v1';

    private API_URL = environment.baseUrl + '/api/mantenedor/v1';

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.baseUrl = this.configService.baseUrl + this.UrlApi;
    }
    
    async getPersonas(): Promise<Observable<Persona[]>> {
        return this.http.get<Persona[]>(`${this.baseUrl}/findallpersonas`);
    }

    creaPersona(persona: Persona): Observable<Persona> {
        return this.http.post<Persona>(`${this.baseUrl}/creapersona`, persona);
    }
}
