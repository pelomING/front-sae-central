import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turnos } from '../model/turnos.model';
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


export class TurnosService {

    private baseUrl: string = '';
    private UrlApi = '/api/reportes/v1';

    constructor(private http: HttpClient, private configService: ConfigService) {

        this.baseUrl = this.configService.baseUrl + this.UrlApi;

    }

    getJornada(): Observable<Turnos[]> {
        return this.http.get<Turnos[]>(`${this.baseUrl}/alljornada`);
    }



    // /api/reportes/v1/updatejornada/{id}

    updateJornada(turno: Turnos): Observable<any[]> {

        const data = {
            fecha_hora_ini : turno.fecha_hora_ini ,
            fecha_hora_fin : turno.fecha_hora_fin
           };

        return this.http.put<any[]>(`${this.baseUrl}/updatejornada/${turno.id}`, data, httpOptions).pipe(
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
