import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { EstadoResultado } from '../model/estadoResultado.model'
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

//const API_URL = 'http://localhost:8080/api/reportes/v1';
//const API_URL_2 = 'https://backend-sae-postgres-desarrollo.up.railway.app/api/reportes/v1';

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

@Injectable()
export class EstadoResultadoService {

    private baseUrl: string = '';
    private UrlApi = '/api/reportes/v1';

    private API_URL = environment.baseUrl + '/api/reportes/v1';

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.baseUrl = this.configService.baseUrl + this.UrlApi;
    }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getEstadosResultados(): Observable<EstadoResultado[]> {
        return this.http.get<EstadoResultado[]>(`${this.baseUrl}/allestadosresultado`);
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


    PERMANENICACARGOFIJOSEMANALPORBRIGADA(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/permanencia_por_brigada`).pipe(
            map(response => response.detalle) // Extrae solo la propiedad 'detalle' del objeto de respuesta
          );
    }


    OBSERVACIONES(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/observacionesnoprocesadas`);
    }


    HORASEXTRAS(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/horasextras`).pipe(
            map(response => response.detalle) // Extrae solo la propiedad 'detalle' del objeto de respuesta
          );
    }


    TURNOSADICIONALES(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/turnosadicionales`).pipe(
            map(response => response.detalle) // Extrae solo la propiedad 'detalle' del objeto de respuesta
          );
    }


    TURNOSCONTINGENCIA(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/turnoscontingencia`).pipe(
            map(response => response.detalle) // Extrae solo la propiedad 'detalle' del objeto de respuesta
          );
    }


    PRODUCCIONPxQ(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/produccionpxq`).pipe(
            map(response => response.detalle) // Extrae solo la propiedad 'detalle' del objeto de respuesta
          );
    }


    COBROSADICIONALES(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/reportecobroadicional`).pipe(
            map(response => response.detalle) // Extrae solo la propiedad 'detalle' del objeto de respuesta
          );
    }


    DESCUENTOS(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/reportedescuentos`).pipe(
            map(response => response.detalle) // Extrae solo la propiedad 'detalle' del objeto de respuesta
          );
    }


    RESUMEN(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/reporteresumen`).pipe(
            map(response => response.detalle) // Extrae solo la propiedad 'detalle' del objeto de respuesta
          );
    }



    detallepxq(idPaquete: string): Observable<any> {

        // Define los parámetros utilizando los argumentos de la función
        const params = new HttpParams()
        .set('id_paquete', idPaquete.toString()); // Convierte a cadena si es necesario

        return this.http.get<any>(`${this.baseUrl}/detallepxq`, { params });

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
