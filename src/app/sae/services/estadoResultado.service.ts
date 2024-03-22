import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { EstadoResultado } from '../models/estadoResultado.model'
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

//const API_URL = 'http://localhost:8080/api/reportes/v1';
//const API_URL_2 = 'https://backend-sae-postgres-desarrollo.up.railway.app/api/reportes/v1';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


interface ResumenEvento {
    cantidad: string;
    glosa_evento: string;
    id_paquete: string;
    id_tipo_evento: string;
    monto: string;
    precio: string;
    tipo_evento: string;
}

interface ResumenTurno {
    cantidad_brigada: string;
    id_paquete: string;
    id_turno: string;
    monto: string;
    permanencia_semanal: string;
    precio: string;
    uso_semanal: string;
}


interface Observacion {
    id: number,
    fecha_hora: string,
    detalle: string
}


interface CobrosAdicionales {
    id: number,
    fecha_hora: string,
    detalle: string,
    cantidad: string,
    valor: string
}


interface Descuentos {
    id: number,
    fecha_hora: string,
    detalle: string,
    cantidad: string,
    valor: string
}


interface InterfaceHoraExtra {
    id?: number,
    fecha_hora?: string,
    brigada?: InterfaceBrigada,
    cantidad?: string,
    comentario?: string
}

interface InterfaceBrigada {
    id: Number;
    brigada: string;
}


interface CierrePeriodoInterface {
    periodo: string;
    zonal: Zona;
    fecha_inicial: string;
    fecha_final: string;
    coordinador_pelom: string;
    supervisor_cge: string;
    turnos_comprometidos: string;
    fecha_generacion: string;
}


interface Zona {
    name: string;
    code: string;
}


@Injectable({ providedIn: 'root' })
export class EstadoResultadoService {

    private baseUrl: string = '';

    private baseUrl2: string = '';
        
    private UrlApi = '/api/reportes/v1';

    private API_URL = environment.baseUrl + '/api/reportes/v1';

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.baseUrl = this.configService.baseUrl + this.UrlApi;
        this.baseUrl2 = this.configService.baseUrl;
    }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }



    getEstadosResultados(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/historicoedp`);
    }

    getResumenEventos(fechaInicial: string, fechaFinal: string, idPaquete: number): Observable<ResumenEvento[]> {
        // Define los parámetros utilizando los argumentos de la función
        const params = new HttpParams()
            .set('fecha_inicial', fechaInicial)
            .set('fecha_final', fechaFinal)
            .set('id_paquete', idPaquete.toString()); // Convierte a cadena si es necesario

        // Realiza la solicitud GET con los parámetros en la URL
        return this.http.get<ResumenEvento[]>(`${this.baseUrl}/resumeneventos`, { params });
    }

    getResumenTurnos(fechaInicial: string, fechaFinal: string, idPaquete: number): Observable<ResumenTurno[]> {
        // Define los parámetros utilizando los argumentos de la función
        const params = new HttpParams()
            .set('fecha_inicial', fechaInicial)
            .set('fecha_final', fechaFinal)
            .set('id_paquete', idPaquete.toString()); // Convierte a cadena si es necesario

        // Realiza la solicitud GET con los parámetros en la URL
        return this.http.get<ResumenTurno[]>(`${this.baseUrl}/resumenturnos`, { params });
    }




    CARGOFIJOSEMANALPORBRIGADA(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/semanal_por_brigada`);
    }


    PERMANENICACARGOFIJOSEMANALPORBRIGADA(nuevaConsulta): Observable<any> {

        const params = new HttpParams()
            .set('fecha_ini', nuevaConsulta.FechaInicio.toString())
            .set('fecha_fin', nuevaConsulta.FechaFinal.toString());

        return this.http.get<any>(`${this.baseUrl}/permanencia_por_brigada`, { params }).pipe(
            map(response => response) // Extrae solo la propiedad 'detalle' del objeto de respuesta
        );
    }


    OBSERVACIONES(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/observacionesnoprocesadas`);
    }


    HORASEXTRAS(nuevaConsulta): Observable<any> {

        const params = new HttpParams()
            .set('fecha_ini', nuevaConsulta.FechaInicio.toString())
            .set('fecha_fin', nuevaConsulta.FechaFinal.toString());

        return this.http.get<any>(`${this.baseUrl}/horasextras`, { params }).pipe(
            map(response => response) // Extrae solo la propiedad 'detalle' del objeto de respuesta
        );
    }


    TURNOSADICIONALES(nuevaConsulta): Observable<any> {

        const params = new HttpParams()
            .set('fecha_ini', nuevaConsulta.FechaInicio.toString())
            .set('fecha_fin', nuevaConsulta.FechaFinal.toString());

        return this.http.get<any>(`${this.baseUrl}/turnosadicionales`, { params }).pipe(
            map(response => response) // Extrae solo la propiedad 'detalle' del objeto de respuesta
        );
    }


    TURNOSCONTINGENCIA(nuevaConsulta): Observable<any> {

        const params = new HttpParams()
            .set('fecha_ini', nuevaConsulta.FechaInicio.toString())
            .set('fecha_fin', nuevaConsulta.FechaFinal.toString());

        return this.http.get<any>(`${this.baseUrl}/turnoscontingencia`, { params }).pipe(
            map(response => response) // Extrae solo la propiedad 'detalle' del objeto de respuesta
        );
    }


    PRODUCCIONPxQ(nuevaConsulta): Observable<any> {

        const params = new HttpParams()
            .set('fecha_ini', nuevaConsulta.FechaInicio.toString())
            .set('fecha_fin', nuevaConsulta.FechaFinal.toString());

        return this.http.get<any>(`${this.baseUrl}/produccionpxq`, { params }).pipe(
            map(response => response) // Extrae solo la propiedad 'detalle' del objeto de respuesta
        );
    }


    COBROSADICIONALES(nuevaConsulta): Observable<any> {

        const params = new HttpParams()
            .set('fecha_ini', nuevaConsulta.FechaInicio.toString())
            .set('fecha_fin', nuevaConsulta.FechaFinal.toString());

        return this.http.get<any>(`${this.baseUrl}/reportecobroadicional`, { params }).pipe(
            map(response => response) // Extrae solo la propiedad 'detalle' del objeto de respuesta
        );
    }


    DESCUENTOS(nuevaConsulta): Observable<any> {

        const params = new HttpParams()
            .set('fecha_ini', nuevaConsulta.FechaInicio.toString())
            .set('fecha_fin', nuevaConsulta.FechaFinal.toString());

        return this.http.get<any>(`${this.baseUrl}/reportedescuentos`, { params }).pipe(
            map(response => response) // Extrae solo la propiedad 'detalle' del objeto de respuesta
        );
    }


    RESUMEN(nuevaConsulta): Observable<any> {

        const params = new HttpParams()
            .set('fecha_ini', nuevaConsulta.FechaInicio.toString())
            .set('fecha_fin', nuevaConsulta.FechaFinal.toString());

        return this.http.get<any>(`${this.baseUrl}/reporteresumen`, { params }).pipe(
            map(response => response) // Extrae solo la propiedad 'detalle' del objeto de respuesta
        );
    }



    /*CONSUTAS HISTORICAS de ESTADO DE PAGO*/


    PERMANENICACARGOFIJOSEMANALPORBRIGADA_HISTORIAL(id_estado_pago: string): Observable<any> {

        const params = new HttpParams()
            .set('id_estado_pago', id_estado_pago.toString());

        return this.http.get<any>(`${this.baseUrl}/permanencia_por_brigada_historial`, { params }).pipe(
            map(response => response) 
        );
    }


    OBSERVACIONES_HISTORIAL(id_estado_pago: string): Observable<any[]> {

        const params = new HttpParams()
            .set('id_estado_resultado', id_estado_pago.toString());

        return this.http.get<any[]>(`${this.baseUrl}/findobservacioneshistorial`, { params }).pipe(
            map(response => response)
        );

    }


    HORASEXTRAS_HISTORIAL(id_estado_pago: string): Observable<any> {

        const params = new HttpParams()
            .set('id_estado_pago', id_estado_pago.toString());

        return this.http.get<any>(`${this.baseUrl}/horasextrafindHorasExtrasHistorial`, { params }).pipe(
            map(response => response)
        );
    }


    TURNOSADICIONALES_HISTORIAL(id_estado_pago: string): Observable<any> {

        const params = new HttpParams()
            .set('id_estado_pago', id_estado_pago.toString());

        return this.http.get<any>(`${this.baseUrl}/turnosadicionaleshistorial`, { params }).pipe(
            map(response => response)
        );
    }


    TURNOSCONTINGENCIA_HISTORIAL(id_estado_pago: string): Observable<any> {

        const params = new HttpParams()
            .set('id_estado_pago', id_estado_pago.toString());

        return this.http.get<any>(`${this.baseUrl}/turnoscontingenciahistorial`, { params }).pipe(
            map(response => response)
        );
    }


    PRODUCCIONPxQ_HISTORIAL(id_estado_pago: string): Observable<any> {

        const params = new HttpParams()
            .set('id_estado_pago', id_estado_pago.toString());

        return this.http.get<any>(`${this.baseUrl}/produccionpxqhistorial`, { params }).pipe(
            map(response => response)
        );
    }


    COBROSADICIONALES_HISTORIAL(id_estado_pago: string): Observable<any> {

        const params = new HttpParams()
            .set('id_estado_pago', id_estado_pago.toString());

        return this.http.get<any>(`${this.baseUrl}/reportecobroadicionalhistorial`, { params }).pipe(
            map(response => response)
        );
    }


    DESCUENTOS_HISTORIAL(id_estado_pago: string): Observable<any> {

        const params = new HttpParams()
            .set('id_estado_pago', id_estado_pago.toString());

        return this.http.get<any>(`${this.baseUrl}/reportedescuentoshistorial`, { params }).pipe(
            map(response => response)
        );
    }


    RESUMEN_HISTORIAL(id_estado_pago: string): Observable<any> {

        const params = new HttpParams()
            .set('id_estado_pago', id_estado_pago.toString());

        return this.http.get<any>(`${this.baseUrl}/reporteresumenhistorial`, { params }).pipe(
            map(response => response)
        );
    }


    /*====================================================*/




    detallepxq(idPaquete: string): Observable<any> {

        // Define los parámetros utilizando los argumentos de la función
        const params = new HttpParams()
            .set('id_paquete', idPaquete.toString()); // Convierte a cadena si es necesario

        return this.http.get<any>(`${this.baseUrl}/detallepxq`, { params });

    }


    ///api/reportes/v1/detallepxqhistorial
    detallepxqhistorial(idPaquete: number, id_estado_pago: number): Observable<any> {

        // Define los parámetros utilizando los argumentos de la función
        const params = new HttpParams()
            .set('id_paquete', idPaquete.toString())
            .set('id_estado_pago', id_estado_pago.toString()); // Convierte a cadena si es necesario

        return this.http.get<any>(`${this.baseUrl}/detallepxqhistorial`, { params });

    }



    listabrigadassae() {
        return this.http.get<any>(`${this.baseUrl2}/api/movil/v1/listabrigadassae`);
    }

    listaTipodeturno() {
        return this.http.get<any>(`${this.baseUrl2}/api/movil/v1/tipoturno`);
    }

    listaMaestros() {
        return this.http.get<any>(`${this.baseUrl2}/api/movil/v1/usuariosApp`);
    }

    listaAyudantes() {
        return this.http.get<any>(`${this.baseUrl2}/api/movil/v1/ayudantes`);
    }

    listaCamionetas() {
        return this.http.get<any>(`${this.baseUrl2}/api/movil/v1/camionetas`);
    }

    
    listaTipoEvento() {
        return this.http.get<any>(`${this.baseUrl2}/api/movil/v1/eventostipo`);
    }

    listaComuna() {
        return this.http.get<any>(`${this.baseUrl2}/api/movil/v1/comunas`);
    }




    horaextranoprocesados() {
        return this.http.get<any>(`${this.baseUrl}/horaextranoprocesados`);
    }

    createHoraExtra(nuevo: InterfaceHoraExtra): Observable<any[]> {

        const data = {
            fecha_hora: nuevo.fecha_hora,
            brigada: nuevo.brigada.id,
            cantidad: nuevo.cantidad,
            comentario: nuevo.comentario,
        };

        console.log("data enviada", data);

        return this.http.post<any[]>(`${this.baseUrl}/creahoraextra`, data, httpOptions).pipe(
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

    updateHoraExtra(nuevo: InterfaceHoraExtra): Observable<any[]> {

        const data = {
            fecha_hora: nuevo.fecha_hora,
            brigada: nuevo.brigada.id,
            cantidad: nuevo.cantidad,
            comentario: nuevo.comentario,
        };

        return this.http.put<any[]>(`${this.baseUrl}/updatehoraextra/${nuevo.id}`, data, httpOptions).pipe(
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


    deleteHoraExtra(ObjectDelete: InterfaceHoraExtra): Observable<any> {

        return this.http.delete<any>(`${this.baseUrl}/deletehoraextra/${ObjectDelete.id}`, httpOptions).pipe(
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



    descuentosnoprocesados() {
        return this.http.get<any>(`${this.baseUrl}/descuentosnoprocesados`);
    }

    createDescuentos(nuevo: Descuentos): Observable<any[]> {

        const data = {
            fecha_hora: nuevo.fecha_hora,
            detalle: nuevo.detalle,
            cantidad: nuevo.cantidad,
            valor: nuevo.valor,
        };

        console.log("data enviada", data);

        return this.http.post<any[]>(`${this.baseUrl}/creadescuentos`, data, httpOptions).pipe(
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


    updateDescuentos(nuevo: Descuentos): Observable<any[]> {

        const data = {
            fecha_hora: nuevo.fecha_hora,
            detalle: nuevo.detalle,
            cantidad: nuevo.cantidad,
            valor: nuevo.valor,
        };

        return this.http.put<any[]>(`${this.baseUrl}/updatedescuentos/${nuevo.id}`, data, httpOptions).pipe(
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



    deleteDescuentos(ObjectDelete: Descuentos): Observable<any> {

        return this.http.delete<any>(`${this.baseUrl}/deletedescuento/${ObjectDelete.id}`, httpOptions).pipe(
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



    cobroadicionalnoprocesado() {
        return this.http.get<any>(`${this.baseUrl}/cobroadicionalnoprocesado`);
    }


    createCobroAdicional(nuevo: CobrosAdicionales): Observable<any[]> {

        const data = {
            fecha_hora: nuevo.fecha_hora,
            detalle: nuevo.detalle,
            cantidad: nuevo.cantidad,
            valor: nuevo.valor,
        };

        console.log("data enviada", data);

        return this.http.post<any[]>(`${this.baseUrl}/creacobroadicional`, data, httpOptions).pipe(
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


    updateCobroAdicional(nuevo: CobrosAdicionales): Observable<any[]> {

        const data = {
            fecha_hora: nuevo.fecha_hora,
            detalle: nuevo.detalle,
            cantidad: nuevo.cantidad,
            valor: nuevo.valor,
        };

        return this.http.put<any[]>(`${this.baseUrl}/updatecobroadicional/${nuevo.id}`, data, httpOptions).pipe(
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


    deleteCobroAdicional(ObjectDelete: CobrosAdicionales): Observable<any> {

        return this.http.delete<any>(`${this.baseUrl}/deletecobroadicional/${ObjectDelete.id}`, httpOptions).pipe(
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



    observacionesnoprocesadas() {
        return this.http.get<any>(`${this.baseUrl}/observacionesnoprocesadas`);
    }

    createObservacion(nuevo: Observacion): Observable<any[]> {

        const data = {
            fecha_hora: nuevo.fecha_hora,
            detalle: nuevo.detalle,
        };

        console.log("data enviada", data);

        return this.http.post<any[]>(`${this.baseUrl}/creaobservaciones`, data, httpOptions).pipe(
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

    updateObservacion(nuevo: Observacion): Observable<any[]> {

        const data = {
            fecha_hora: nuevo.fecha_hora,
            detalle: nuevo.detalle,
        };

        return this.http.put<any[]>(`${this.baseUrl}/updateobservaciones/${nuevo.id}`, data, httpOptions).pipe(
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



    deleteObservacion(nuevo: Observacion): Observable<any> {

        return this.http.delete<any>(`${this.baseUrl}/deleteobservaciones/${nuevo.id}`, httpOptions).pipe(
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




    createEstadoResultado(nuevo: CierrePeriodoInterface): Observable<any[]> {

        const data = {
            periodo: nuevo.periodo,
            zonal: nuevo.zonal.name,
            fecha_inicial: nuevo.fecha_inicial,
            fecha_final: nuevo.fecha_final,
            coordinador_pelom: nuevo.coordinador_pelom,
            supervisor_cge: nuevo.supervisor_cge,
            turnos_comprometidos: nuevo.turnos_comprometidos,
            fecha_generacion: nuevo.fecha_generacion
        };

        console.log("data enviada", data);

        return this.http.post<any[]>(`${this.baseUrl}/cierraedp`, data, httpOptions).pipe(
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



    getcreaEstadoResultado(fechaInicial: string, fechaFinal: string, idPaquete: number): Observable<any[]> {

        // Define los parámetros utilizando los argumentos de la función
        // const params = new HttpParams()
        //     .set('fecha_inicial', fechaInicial)
        //     .set('fecha_final', fechaFinal)
        //     .set('id_paquete', idPaquete.toString()); // Convierte a cadena si es necesario

        const data = {
            fecha_inicial: fechaInicial,
            fecha_final: fechaFinal,
            id_paquete: idPaquete
        };

        // Define las cabeceras de la solicitud (opcional)
        const headers = new HttpHeaders({
            'Content-Type': 'application/json' // Puedes ajustar el tipo de contenido según tus necesidades
        });

        // Realiza la solicitud GET con los parámetros en la URL
        return this.http.post<any[]>(`${this.baseUrl} / creaEstadoResultado`, data, { headers });

    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
