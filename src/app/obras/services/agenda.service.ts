import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, map, catchError, throwError } from 'rxjs';

import { Obra } from '../interfaces/obra.interface';
import { VisitaTerreno, VisitaTerrenoCrear } from '../interfaces/visita-terreno.interface';

import { ConfigService } from '../../_services/config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AgendaService {

  private baseUrl: string = '';
  private baseUrlGeneral: string = '';
  private UrlApi = '/api/obras/backoffice/v1/';
  private UrlApiGeneral = '/api/obras/backoffice/general/v1/';


  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.baseUrl + this.UrlApi;
    this.baseUrlGeneral = this.configService.baseUrl + this.UrlApiGeneral;
  }


  createVisitaTerreno(newVisitaTerreno: VisitaTerreno): Observable<any[]> {

    const data = {
      id_obra: newVisitaTerreno.id_obra,
      fecha_visita: newVisitaTerreno.fecha_visita,
      direccion: newVisitaTerreno.direccion,
      persona_mandante: newVisitaTerreno.persona_mandante,
      cargo_mandante: newVisitaTerreno.cargo_mandante,
      persona_contratista: newVisitaTerreno.persona_contratista,
      cargo_contratista: newVisitaTerreno.cargo_contratista,
      observacion: newVisitaTerreno.observacion
    };

    console.log("data enviada", data);

    return this.http.post<any[]>(`${this.baseUrl}creavisitaterreno`, data, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateVisitaTerreno(newVisitaTerreno: VisitaTerreno): Observable<any[]> {

    const data = {
      fecha_visita: newVisitaTerreno.fecha_visita,
      direccion: newVisitaTerreno.direccion,
      persona_mandante: newVisitaTerreno.persona_mandante,
      cargo_mandante: newVisitaTerreno.cargo_mandante,
      persona_contratista: newVisitaTerreno.persona_contratista,
      cargo_contratista: newVisitaTerreno.cargo_contratista,
      observacion: newVisitaTerreno.observacion
    };

    console.log("id visita terreno", newVisitaTerreno.id);
    console.log("data enviada para actualizar", data);

    return this.http.put<any[]>(`${this.baseUrl}actualizavisitaterreno/${newVisitaTerreno.id}`, data, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }


  ///api/obras/backoffice/v1/eliminavisitaterreno/{id}

  eliminaVisitaTerreno(visitaTerreno: VisitaTerreno): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}eliminavisitaterreno/${visitaTerreno.id}`, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }



  getAllVisitasTerreno(): Observable<any> {
    return this.http.get(`${this.baseUrl}allvisitaterreno`, httpOptions)
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



  getAllVisitasTerrenoPorObra(obra: Obra): Observable<any> {

    return this.http.get(`${this.baseUrl}visitaterreno?id_obra=${obra.id}`, httpOptions)
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



  getAllEstadosVisitas(): Observable<any> {
    return this.http.get(`${this.baseUrlGeneral}allestadovisitas`, httpOptions)
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


  /******************************************************************/
  /******************************************************************/

  getAllTipoObras(): Observable<any> {
    return this.http.get(`${this.baseUrl}alltipoobras`, httpOptions)
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


  getAllZonas(): Observable<any> {
    return this.http.get(`${this.baseUrl}allzonales`, httpOptions)
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



  getAllDelegaciones(): Observable<any> {
    return this.http.get(`${this.baseUrl}alldelegaciones`, httpOptions)
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



  getAllTipoTrabajos(): Observable<any> {
    return this.http.get(`${this.baseUrl}alltipotrabajos`, httpOptions)
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


  getAllEmpresaContratistas(): Observable<any> {
    return this.http.get(`${this.baseUrl}allempresacontratistas`, httpOptions)
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


  getAllCoordinadorContratistas(): Observable<any> {
    return this.http.get(`${this.baseUrl}allcoordinadorcontratistas`, httpOptions)
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


  getAllComunas(): Observable<any> {
    return this.http.get(`${this.baseUrl}allcomunas`, httpOptions)
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


  getAllEstados(): Observable<any> {
    return this.http.get(`${this.baseUrl}allestados`, httpOptions)
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


  getAllSegmentos(): Observable<any> {
    return this.http.get(`${this.baseUrl}allsegmentos`, httpOptions)
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