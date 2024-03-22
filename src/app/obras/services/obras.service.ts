import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, map, catchError, throwError } from 'rxjs';
import { Obra } from '../interfaces/obra.interface';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ObrasService {

  private baseUrl: string = '';
  private baseUrlObras: string = '';

  private UrlApi = '/api/obras/backoffice/general/v1/';

  private UrlApiObras = '/api/obras/backoffice/v1/';


  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.baseUrl + this.UrlApi;
    this.baseUrlObras = this.configService.baseUrl + this.UrlApiObras;
  }


  createObra(newObra: Obra): Observable<any[]> {

    const data = {
      codigo_obra: newObra.codigo_obra,
      numero_ot: "e",
      nombre_obra: newObra.nombre_obra,
      zona: newObra.zona.id,
      delegacion: newObra.delegacion.id,
      gestor_cliente: newObra.gestor_cliente,
      numero_aviso: newObra.numero_aviso,
      numero_oc: newObra.numero_oc,
      monto: 0,
      cantidad_uc: newObra.cantidad_uc,
      fecha_llegada: newObra.fecha_llegada,
      fecha_inicio: newObra.fecha_inicio,
      fecha_termino: newObra.fecha_termino,
      tipo_trabajo: newObra.tipo_trabajo.id,
      persona_envia_info: "zz",
      cargo_persona_envia_info: "zz",
      empresa_contratista: newObra.empresa_contratista.id,
      coordinador_contratista: newObra.coordinador_contratista.id,
      comuna: newObra.comuna.codigo,
      ubicacion: newObra.ubicacion,
      tipo_obra: newObra.tipo_obra.id,
      segmento: newObra.segmento.id,
      jefe_delegacion: newObra.jefe_delegacion,
      oficina: newObra.oficina,
      recargo_distancia: newObra.recargo_distancia
    };

    console.log("data enviada", data);

    return this.http.post<any[]>(`${this.baseUrlObras}creaobra`, data, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );

  }



  ///api/obras/backoffice/v1/paralizaobra 
  ParalizaObra(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrlObras}paralizaobra`, data, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }


  // /api/obras/backoffice/v1/cierraobra
  Cierraobra(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrlObras}cierraobra`, data, httpOptions).pipe(
      map((response) => {
        return response;
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
      tipo_obra: Obra.tipo_obra.id,
      segmento: Obra.segmento.id,
      jefe_delegacion: Obra.jefe_delegacion,
      oficina: Obra.oficina,
      recargo_distancia: Obra.recargo_distancia
    };

    return this.http.put<any[]>(`${this.baseUrlObras}actualizaobra/${Obra.id}`, data, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );

  }


  deleleObra(Obra: Obra): Observable<any[]> {

    return this.http.delete<any[]>(`${this.baseUrlObras}eliminaobra/${Obra.id}`, httpOptions).pipe(
      map((response) => {
        return response;
      })
    );

  }



  getAllObras(codigo_vista: any): Observable<any> {

    return this.http.get(`${this.baseUrlObras}allobras?vista=${codigo_vista}`, httpOptions)
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



  // /api/obras/backoffice/v1/codigodeobraemergencia
  getCodigodeobraemergencia(): Observable<any> {

    return this.http.get(`${this.baseUrlObras}codigodeobraemergencia`, httpOptions)
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



  // /api/obras/backoffice/general/v1/alloficinasupervisor
  getAlloficinasupervisor(): Observable<any> {

    return this.http.get(`${this.baseUrl}alloficinasupervisor`, httpOptions)
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


  //  /api/obras/backoffice/general/v1/allrecargospordistancia
  getAllrecargospordistancia(): Observable<any> {

    return this.http.get(`${this.baseUrl}allrecargospordistancia`, httpOptions)
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


  // /api/obras/backoffice/v1/resumenobras
  getResumenObras(): Observable<any> {

    return this.http.get(`${this.baseUrlObras}resumenobras`, httpOptions)
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


  // /api/obras/backoffice/usosistema/v1/alllogin
  getalllogin(): Observable<any> {

    return this.http.get(`${this.configService.baseUrl}/api/obras/backoffice/usosistema/v1/alllogin`, httpOptions)
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

  
  // /api/obras/backoffice/usosistema/v1/resumenobrasrecientes
  getResumenobrasrecientes(): Observable<any> {

    return this.http.get(`${this.configService.baseUrl}/api/obras/backoffice/usosistema/v1/resumenobrasrecientes`, httpOptions)
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

  // /api/obras/backoffice/usosistema/v1/resumenobrasinreportes
  getResumenobrasinreportes(): Observable<any> {

    return this.http.get(`${this.configService.baseUrl}/api/obras/backoffice/usosistema/v1/resumenobrasinreportes`, httpOptions)
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