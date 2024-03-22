import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    private baseUrl: string = '';

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.baseUrl = this.configService.baseUrl;
    }

    CambiaPassword(p: string, c: string): Observable<any> {

        const data = {
            password: p,
            newpassword: c
        };

        return this.http.post<any>(`${this.baseUrl}/api/ajustes/v1/cambiapassword`, data, httpOptions).pipe(
            map((response) => {
                return response;
            })
        );

    }

    //https://backend-pelom-desarrollo.up.railway.app/api/ajustes/v1/resetpassword
    ResetPassword(u: string): Observable<any> {

        const data = {
            username: u
        };

        return this.http.post<any>(`${this.baseUrl}/api/ajustes/v1/resetpassword`, data, httpOptions).pipe(
            map((response) => {
                return response;
            })
        );

    }

    //https://backend-pelom-desarrollo.up.railway.app/api/obras/backoffice/general/v1/allusuarios
    getAllUsuarios(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/api/obras/backoffice/general/v1/allusuarios`).pipe(
            map((response) => {

                console.log(response);

                return response;
            })
        );
    }



    //getEventos(): Observable<Eventos[]> {
    //return this.http.get<Eventos[]>(`${this.baseUrl}/alleventos?vertodo=false`).pipe(
    //map((response) => {
    //if (response) {
    //console.log('response', response);
    // Filtra los elementos que tienen estado 1
    // const filteredResponse = response.filter(item => item.estado === 1);
    //return response;
    //} else {
    //throw new Error('Respuesta inesperada del servidor');
    //}
    //}),
    //catchError((error) => {
    //console.error('Error en la solicitud:', error);
    //return throwError('Ha ocurrido un error en la solicitud.');
    //})
    //);
    //}



    ///api/reportes/v1/updateevento/{id}
    //updateEvento(evento: Eventos): Observable<any[]> {
    // const data = {
    //     numero_ot: evento.numero_ot,
    //     tipo_evento: evento.obj_tipo_evento.codigo,
    //     rut_maestro: evento.obj_maestro.rut,
    //     rut_ayudante: evento.obj_ayudante.rut,
    //     direccion: evento.direccion,
    //     fecha_hora: evento.fecha_hora,
    //     hora_inicio: evento.hora_inicio,
    //     hora_termino: evento.hora_termino,
    //     brigada: evento.obj_brigada.id,
    //     comuna: evento.obj_comuna.codigo,
    //     despachador: evento.despachador,
    //     tipo_turno: evento.obj_tipo_turno.id,
    //     patente: evento.obj_camionetas.patente,
    //     trabajo_solicitado: evento.trabajo_solicitado,
    //     trabajo_realizado: evento.trabajo_realizado
    // };

    // return this.http.put<any[]>(`${this.baseUrl}/updateevento/${evento.id}`, data, httpOptions).pipe(
    //     map((response) => {
    //         return response;
    //     })
    // );
    //}



    ///api/reportes/v1/creaevento
    //creaEvento(evento: Eventos): Observable<Eventos> {
    // const data = {
    //     numero_ot: evento.numero_ot,
    //     tipo_evento: evento.obj_tipo_evento.codigo,
    //     rut_maestro: evento.obj_maestro.rut,
    //     rut_ayudante: evento.obj_ayudante.rut,
    //     direccion: evento.direccion,
    //     fecha_hora: evento.fecha_hora,
    //     coordenada_x: evento.coordenada_x,
    //     coordenada_y: evento.coordenada_y,
    //     hora_inicio: evento.hora_inicio,
    //     hora_termino: evento.hora_termino,
    //     brigada: evento.obj_brigada.id,
    //     comuna: evento.obj_comuna.codigo,
    //     despachador: evento.despachador,
    //     tipo_turno: evento.obj_tipo_turno.id,
    //     patente: evento.obj_camionetas.patente,
    //     trabajo_solicitado: evento.trabajo_solicitado,
    //     trabajo_realizado: evento.trabajo_realizado
    // };

    // return this.http.post<Eventos>(`${this.baseUrl}/creaevento`, data, httpOptions).pipe(
    //     map((response) => {
    //         return response;
    //     })
    // );
    //}


    // /api/reportes/v1/deleteevento/{id}
    //deleteEvento(evento: Eventos): Observable<any> {
    // return this.http.delete<any>(`${this.baseUrl}/deleteevento/${evento.id}`, httpOptions).pipe(
    //     map((response) => {
    //             return response;
    //     })
    // );
    //}

}
