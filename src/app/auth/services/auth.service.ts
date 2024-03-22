import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, of, map, catchError, throwError, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';
import { User } from '../interfaces/user.interface';
import { StorageService } from '../services/storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient,private storageService: StorageService,private configService: ConfigService) {
    console.log("environment.baseUrl",environment.baseUrl)
    this.baseUrl = this.configService.baseUrl;
  }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(username: string, password: string): Observable<any> {

      const data = {
        username: username,
        password: password
      };
  
      // return this.http.post<any>(`${this.baseUrl}/api/auth/signin`, data, httpOptions).pipe(
      //   map((user) => {
      //       return user;
      //   })
      // );

      //

      return this.http.post<any>(`${this.baseUrl}/api/auth/signin`, data, httpOptions).pipe(
        map((user) => {
          // Procesar la respuesta exitosa aquí si es necesario
          return user;
        }),
        timeout(10000),
        catchError((error) => {

          if (error.name === 'TimeoutError') {
            console.error('Tiempo de espera excedido:', error);
            return throwError('La solicitud tardó demasiado en completarse. Por favor, inténtalo de nuevo.') as Observable<never>;
          } else if (error.status === 401) {
            console.error('Error de autorización:', error);
            return throwError('La contraseña no es valida.');
          } else if (error.status === 403) {
            console.error('Error de prohibición:', error);
            return throwError('Acceso prohibido.');
          } else if (error.status === 404) {
            console.error('Recurso no encontrado:', error);
            return throwError('El usuario solicitado no se encontró.');
          } else if (error.status === 500) {
            console.error('Error interno del servidor:', error);
            return throwError('Hubo un error interno del servidor. Por favor, inténtalo de nuevo más tarde.');
          } else {
            console.error('Error en la solicitud:', error);
            return throwError('Hubo un error en la solicitud. Por favor, inténtalo de nuevo.');
          }

        })
      );


  }


  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/auth/signup`,
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }



  checkAuthentication(): Observable<boolean> {

    if (!this.storageService.isLoggedIn()) return of(false);

    return this.http.get<User>(`${this.baseUrl}/api/users/3`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      );

  }


  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signout`, {}, httpOptions);
  }

}
