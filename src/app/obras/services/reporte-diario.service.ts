import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, map, catchError, throwError } from 'rxjs';

import { Obra } from '../interfaces/obra.interface';
import { ReporteDiario, Tipooperacion, Tipoactividad, Maestroactividad, Unidad } from '../interfaces/reporte-diario.interface';

import { ConfigService } from '../../_services/config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ReporteDiarioService {


  private baseUrl: string = '';

  private baseUrlReporte: string = '';

  private UrlApi = '/api/obras/backoffice/v1/';

  private UrlApiReporte = '/api/obras/backoffice/repodiario/v1/';



  constructor(private http: HttpClient, private configService: ConfigService) {

    this.baseUrl = this.configService.baseUrl + this.UrlApi;

    this.baseUrlReporte = this.configService.baseUrl + this.UrlApiReporte;

  }



  ///api/obras/backoffice/repodiario/v1/reportesdiariosporparametros

  //https://backend-pelom-desarrollo.up.railway.app

  ///api/obras/backoffice/repodiario/v1/reportesdiariosporparametros?id_obra=2

  getAllReportesDiariosPorObra(obra: Obra): Observable<any> {

    console.log("Solicitud getAllReportesDiariosPorObra : ", obra.id);

    console.log("baseUrlReporte : ", this.baseUrlReporte);

    return this.http.get(`${this.baseUrlReporte}reportesdiariosporparametros?id_obra=${obra.id}`, httpOptions)
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


  
  
  // 'https://backend-pelom-desarrollo.up.railway.app/api/obras/backoffice/repodiario/v1/ultimoreportediario?id_obra=8' 
  
  getUltimoreportediario(obra: Obra): Observable<any> {

    return this.http.get(`${this.baseUrlReporte}ultimoreportediario?id_obra=${obra.id}`, httpOptions)
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



  // /api/obras/backoffice/repodiario/v1/alltipooperacion		
  getAlltipooperacion(): Observable<any> {
    return this.http.get(`${this.baseUrlReporte}alltipooperacion`, httpOptions)
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


  // /api/obras/backoffice/repodiario/v1/allrecargoshora

  getAllrecargoshora(): Observable<any> {
    return this.http.get(`${this.baseUrlReporte}allrecargoshora`, httpOptions)
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




  // /api/obras/backoffice/repodiario/v1/alltipoactividad			
  getAlltipoactividad(): Observable<any> {
    return this.http.get(`${this.baseUrlReporte}alltipoactividad`, httpOptions)
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

  // /api/obras/backoffice/repodiario/v1/allmaestroactividad	
  getAllmaestroactividad(): Observable<any> {
    return this.http.get(`${this.baseUrlReporte}allmaestroactividad`, httpOptions)
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


  // /api/obras/backoffice/repodiario/v1/alljefesfaena
  getAlljefesfaena(): Observable<any> {
    return this.http.get(`${this.baseUrlReporte}alljefesfaena`, httpOptions)
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


  // /api/obras/backoffice/repodiario/v1/allareas

  getAllareas(): Observable<any> {
    return this.http.get(`${this.baseUrlReporte}allareas`, httpOptions)
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




  // /api/obras/backoffice/repodiario/v1/creareportediario
  guardarReporteDiario(reporte_diario: ReporteDiario): Observable<ReporteDiario> {
    console.log("guardar =>", reporte_diario );
    return this.http.post<ReporteDiario>(`${this.baseUrlReporte}creareportediario`, reporte_diario, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  
  // /api/obras/backoffice/repodiario/v1/actualizareportediario/{id} 
  ActualizarReporteDiario(reporte_diario: ReporteDiario): Observable<ReporteDiario> {
    console.log("ActualizarReporteDiario =>", reporte_diario );
    return this.http.put<ReporteDiario>(`${this.baseUrlReporte}actualizareportediario/${reporte_diario.id}`, reporte_diario, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );  
  }

 
    // /api/obras/backoffice/repodiario/v1/eliminareportediario/{id}
    Eliminareportediario(reporte_diario: ReporteDiario): Observable<ReporteDiario> {
      console.log("Eliminareportediario =>", reporte_diario );
      return this.http.delete<ReporteDiario>(`${this.baseUrlReporte}eliminareportediario/${reporte_diario.id}`,httpOptions).pipe(
        map((response) => {
          return response;
        })
      );
    }

}