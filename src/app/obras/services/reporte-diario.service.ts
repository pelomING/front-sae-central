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









  /*TODO POR AQUI ES DE OBRAS ESTO QUEDA AQUI DE EJEMPLO*/

  createObra(newObra: Obra): Observable<any[]> {

    const data = {
      codigo_obra: newObra.codigo_obra,
      numero_ot: newObra.numero_ot,
      nombre_obra: newObra.nombre_obra,
      zona: newObra.zona.id,
      delegacion: newObra.delegacion.id,
      gestor_cliente: newObra.gestor_cliente,
      numero_aviso: newObra.numero_aviso,
      numero_oc: newObra.numero_oc,
      monto: newObra.monto,
      cantidad_uc: newObra.cantidad_uc,
      fecha_llegada: newObra.fecha_llegada,
      fecha_inicio: newObra.fecha_inicio,
      fecha_termino: newObra.fecha_termino,
      tipo_trabajo: newObra.tipo_trabajo.id,
      persona_envia_info: newObra.persona_envia_info,
      cargo_persona_envia_info: newObra.cargo_persona_envia_info,
      empresa_contratista: newObra.empresa_contratista.id,
      coordinador_contratista: newObra.coordinador_contratista.id,
      comuna: newObra.comuna.codigo,
      ubicacion: newObra.ubicacion,
      estado: newObra.estado.id,
      tipo_obra: newObra.tipo_obra.id,
      segmento: newObra.segmento.id
    };


    console.log("data enviada", data);

    return this.http.post<any[]>(`${this.baseUrl}creaobra`, data, httpOptions).pipe(
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

  updateObra(Obra: Obra): Observable<any[]> {

    const data = {
      codigo_obra: Obra.codigo_obra,
      numero_ot: Obra.numero_ot,
      nombre_obra: Obra.nombre_obra,
      zona: Obra.zona.id,
      delegacion: Obra.delegacion.id,
      gestor_cliente: Obra.gestor_cliente,
      numero_aviso: Obra.numero_aviso,
      numero_oc: Obra.numero_oc,
      monto: Obra.monto,
      cantidad_uc: Obra.cantidad_uc,
      fecha_llegada: Obra.fecha_llegada,
      fecha_inicio: Obra.fecha_inicio,
      fecha_termino: Obra.fecha_termino,
      tipo_trabajo: Obra.tipo_trabajo.id,
      persona_envia_info: Obra.persona_envia_info,
      cargo_persona_envia_info: Obra.cargo_persona_envia_info,
      empresa_contratista: Obra.empresa_contratista.id,
      coordinador_contratista: Obra.coordinador_contratista.id,
      comuna: Obra.comuna.codigo,
      ubicacion: Obra.ubicacion,
      estado: Obra.estado.id,
      tipo_obra: Obra.tipo_obra.id,
      segmento: Obra.segmento.id
    };

    return this.http.put<any[]>(`${this.baseUrl}actualizaobra/${Obra.id}`, data, httpOptions).pipe(
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


  deleleObra(Obra: Obra): Observable<any[]> {

    return this.http.delete<any[]>(`${this.baseUrl}eliminaobra/${Obra.id}`, httpOptions).pipe(
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



  getAllObras(): Observable<any> {
    return this.http.get(`${this.baseUrl}allobras`, httpOptions)
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