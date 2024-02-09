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

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.baseUrl = this.configService.baseUrl + this.UrlApi;
    }

    getEventos(): Observable<Eventos[]> {

        return this.http.get<Eventos[]>(`${this.baseUrl}/alleventos?vertodo=false`).pipe(
        map((response) => {
            if (response) {
              //console.log('response', response);
              // Filtra los elementos que tienen estado 1
              // const filteredResponse = response.filter(item => item.estado === 1);
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



    ///api/reportes/v1/updateevento/{id}
    updateEvento(evento: Eventos): Observable<any[]> {

        const data = {
            numero_ot: evento.numero_ot,
            tipo_evento: evento.obj_tipo_evento.codigo,
            rut_maestro: evento.obj_maestro.rut,
            rut_ayudante: evento.obj_ayudante.rut,
            direccion: evento.direccion,
            fecha_hora: evento.fecha_hora,
            hora_inicio: evento.hora_inicio,
            hora_termino: evento.hora_termino,
            brigada: evento.obj_brigada.id,
            comuna: evento.obj_comuna.codigo,
            despachador: evento.despachador,
            tipo_turno: evento.obj_tipo_turno.id,
            patente: evento.obj_camionetas.patente,
            trabajo_solicitado: evento.trabajo_solicitado,
            trabajo_realizado: evento.trabajo_realizado
        };

        return this.http.put<any[]>(`${this.baseUrl}/updateevento/${evento.id}`, data, httpOptions).pipe(
            map((response) => {
                return response;
            })
        );

    }




    ///api/reportes/v1/creaevento
    creaEvento(evento: Eventos): Observable<Eventos> {

        const data = {
            numero_ot: evento.numero_ot,
            tipo_evento: evento.obj_tipo_evento.codigo,
            rut_maestro: evento.obj_maestro.rut,
            rut_ayudante: evento.obj_ayudante.rut,
            direccion: evento.direccion,
            fecha_hora: evento.fecha_hora,
            coordenada_x: evento.coordenada_x,
            coordenada_y: evento.coordenada_y,
            hora_inicio: evento.hora_inicio,
            hora_termino: evento.hora_termino,
            brigada: evento.obj_brigada.id,
            comuna: evento.obj_comuna.codigo,
            despachador: evento.despachador,
            tipo_turno: evento.obj_tipo_turno.id,
            patente: evento.obj_camionetas.patente,
            trabajo_solicitado: evento.trabajo_solicitado,
            trabajo_realizado: evento.trabajo_realizado
        };

        return this.http.post<Eventos>(`${this.baseUrl}/creaevento`, data, httpOptions).pipe(
            map((response) => {
                return response;
            })
        );

    }


    // /api/reportes/v1/deleteevento/{id}
    deleteEvento(evento: Eventos): Observable<any> {

        return this.http.delete<any>(`${this.baseUrl}/deleteevento/${evento.id}`, httpOptions).pipe(
            map((response) => {
                    return response;
            })
        );

    }




}
