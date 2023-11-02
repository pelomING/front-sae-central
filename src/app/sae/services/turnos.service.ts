import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turnos } from '../model/turnos.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

//const API_URL = 'http://localhost:8080/api/reportes/v1';

@Injectable({
    providedIn: 'root'
})
export class TurnosService {

    private baseUrl: string = '';
    private UrlApi = '/api/reportes/v1';

    constructor(private http: HttpClient, private configService: ConfigService) {

        this.baseUrl = this.configService.baseUrl + this.UrlApi;

    }

    getJornada(): Observable<Turnos[]> {
        return this.http.get<Turnos[]>(`${this.baseUrl}/alljornada`);
    }
    
}
