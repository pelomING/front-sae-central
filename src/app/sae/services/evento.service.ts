import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eventos } from '../model/eventos.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

//const API_URL = 'http://localhost:8080/api/reportes/v1';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class EventoService {

    private baseUrl: string = '';
    private UrlApi = '/api/reportes/v1';

    private API_URL = environment.baseUrl + '/api/reportes/v1';
    
    constructor(private http: HttpClient,private configService: ConfigService) 
    { 
        this.baseUrl = this.configService.baseUrl + this.UrlApi;
    }

    getEventos(): Observable<Eventos[]> {
        return this.http.get<Eventos[]>(`${this.baseUrl}/alleventos`);
    }



    ///api/reportes/v1/updateevento/{id}

    updateEvento(evento: Eventos): Observable<any[]> {

        const data = {
            fecha_hora: evento.fecha_hora
        };

        return this.http.put<any[]>(`${this.baseUrl}/updateevento/${evento.id}`, data, httpOptions).pipe(
            map((response) => {

                if (response) {
                    return response;
                } else {
                    throw new Error('Respuesta inesperada del servidor');
                }

            }),
            catchError((error) => {

                console.error('Error en la solicitud:', error);
                return throwError('Ha ocurrido un error en la solicitud.');

            })
        );

    }



}
