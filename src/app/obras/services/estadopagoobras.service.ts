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
    getListaestadospago(IDOBRA: number): Observable<any> {
        return this.http.get(`${this.baseUrl}listaestadospago?id_obra=${IDOBRA}`, httpOptions)
            .pipe(
                map((response) => {

                    console.log("response", response);


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
    getNuevoencabezado(IDOBRA: number): Observable<any> {
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
    getAllactividadesporobra(IDOBRA: number, IDSReportesDiarios: string): Observable<any> {

        return this.http.get(`${this.baseUrl}allactividadesporobra?id_obra=${IDOBRA}&ids_reporte=${IDSReportesDiarios}`, httpOptions)
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
    getAllactividadesadicionales(IDOBRA: number, IDSReportesDiarios: string): Observable<any> {

        return this.http.get(`${this.baseUrl}allactividadesadicionales?id_obra=${IDOBRA}&ids_reporte=${IDSReportesDiarios}`, httpOptions)
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


    ///api/obras/backoffice/estadopago/v1/allactividadesconhoraextra
    getAllactividadesconhoraextra(IDOBRA: number, IDSReportesDiarios: string): Observable<any> {

        return this.http.get(`${this.baseUrl}allactividadesconhoraextra?id_obra=${IDOBRA}&ids_reporte=${IDSReportesDiarios}`, httpOptions)
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



    ///api/obras/backoffice/estadopago/v1/creaestadopago
    postcreaEstadoPagoObras(ENCABEZADO_OBRAS: any): Observable<any[]> {
        // Realiza la solicitud GET con los parámetros en la URL
        return this.http.post<any[]>(`${this.baseUrl}creaestadopago`, ENCABEZADO_OBRAS, httpOptions);
    }


    // /api/obras/backoffice/estadopago/v1/avancesestadopago
    getAvancesestadopago(IDOBRA: number): Observable<any> {

        return this.http.get(`${this.baseUrl}avancesestadopago?id_obra=${IDOBRA}`, httpOptions)
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



    // /api/obras/backoffice/estadopago/v1/totalesestadopago
    getTotalesestadopago(IDOBRA: number , IDSReportesDiarios: string): Observable<any> {

        return this.http.get(`${this.baseUrl}totalesestadopago?id_obra=${IDOBRA}&ids_reporte=${IDSReportesDiarios}`, httpOptions)
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


    ///api/obras/backoffice/estadopago/v1/historicoestadopagoporid?id_estado_pago=25

    getHistoricoestadopagoporid(ID_ESTADO_PAGO: number): Observable<any> {

        return this.http.get(`${this.baseUrl}historicoestadopagoporid?id_estado_pago=${ID_ESTADO_PAGO}`, httpOptions)
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