import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turnos } from '../models/turnos.model';
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
        
        return this.http.get<Turnos[]>(`${this.baseUrl}/alljornada?vertodo=false`).pipe(
          map((response) => {
            if (response) {
              // Filtra los elementos que tienen estado 1
              //const filteredResponse = response.filter(item => item.estado === 1);
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



    // /api/reportes/v1/updatejornada/{id}

    updateJornada(turno: Turnos): Observable<any[]> {
        
        const data = {
            rut_maestro: turno.rut_maestro,
            rut_ayudante: turno.rut_ayudante,
            patente: turno.patente,
            km_inicial: turno.km_inicial,
            km_final: turno.km_final,
            fecha_hora_ini: turno.fecha_hora_ini,
            fecha_hora_fin: turno.fecha_hora_fin,
            brigada: turno.brigada,
            tipo_turno: turno.tipo_turno
        };


        console.log("data", data);


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



    // /api/reportes/v1/creajornada

    creaJornada(turno: Turnos): Observable<Turnos> {

        const data = {
            rut_maestro: turno.rut_maestro,
            rut_ayudante: turno.rut_ayudante,
            patente: turno.patente,
            km_inicial: turno.km_inicial,
            km_final: turno.km_final,
            fecha_hora_ini: turno.fecha_hora_ini,
            fecha_hora_fin: turno.fecha_hora_fin,
            brigada: turno.brigada,
            tipo_turno: turno.tipo_turno,
            coordenada_x: turno.coordenada_x,
            coordenada_y: turno.coordenada_y,
        };

        return this.http.post<Turnos>(`${this.baseUrl}/creajornada`, data, httpOptions).pipe(
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



    ///api/reportes/v1/deletejornada/{id}
    deleteJornada(turno: Turnos): Observable<any> {

        return this.http.delete<any>(`${this.baseUrl}/deletejornada/${turno.id}`,httpOptions).pipe(
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
