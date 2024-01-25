import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ConfigService } from '../../_services/config.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EstadoPagoObrasService {

    private baseUrl: string = '';
    private UrlApi = '/api/obras/backoffice/estadopago/v1/';
    
    constructor(private http: HttpClient, private configService: ConfigService) {
        this.baseUrl = this.configService.baseUrl + this.UrlApi;   
    }

    // /api/obras/backoffice/estadopago/v1/alltiporecargo
    getAlltiporecargo(): Observable<any> {
        return this.http.get(`${this.baseUrl}alltiporecargo`, httpOptions)
            .pipe(
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

    ///api/obras/backoffice/estadopago/v1/allrecargos
    getAllrecargos(): Observable<any> {
        return this.http.get(`${this.baseUrl}allrecargos`, httpOptions)
            .pipe(
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


    // /api/obras/backoffice/estadopago/v1/listaestadospago
    getListaestadospago(IDOBRA:number): Observable<any> {
        return this.http.get(`${this.baseUrl}listaestadospago?id_obra=${IDOBRA}`, httpOptions)
            .pipe(
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




    ///api/obras/backoffice/estadopago/v1/nuevoencabezado
    getNuevoencabezado(IDOBRA:number): Observable<any> {
        return this.http.get(`${this.baseUrl}nuevoencabezado?id_obra=${IDOBRA}`, httpOptions)
            .pipe(
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


    ///api/obras/backoffice/estadopago/v1/allactividadesporobra
    getAllactividadesporobra(IDOBRA:number): Observable<any> {
        return this.http.get(`${this.baseUrl}allactividadesporobra?id_obra=${IDOBRA}`, httpOptions)
            .pipe(
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


    ///api/obras/backoffice/estadopago/v1/allactividadesadicionales
    getAllactividadesadicionales(IDOBRA:number): Observable<any> {
        return this.http.get(`${this.baseUrl}allactividadesadicionales?id_obra=${IDOBRA}`, httpOptions)
            .pipe(
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