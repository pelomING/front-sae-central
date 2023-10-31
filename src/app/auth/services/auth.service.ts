import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, of, map, catchError } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../interfaces/user.interface';

import { StorageService } from '../services/storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient,private storageService: StorageService) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(username: string, password: string): Observable<User> {

    const data = {
      username: username,
      password: password
    };

    return this.http.post<User>(`${this.baseUrl}/api/auth/signin`, data, httpOptions);

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
