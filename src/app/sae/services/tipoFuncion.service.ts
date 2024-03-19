import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoFuncion } from '../models/tipoFuncion.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigService } from '../../_services/config.service';

@Injectable({
    providedIn: 'root'
})
export class TipoFuncionService {

    private baseUrl: string = '';
    private UrlApi = '/api/mantenedor/v1';

    constructor(private http: HttpClient, private configService: ConfigService) {

        this.baseUrl = this.configService.baseUrl + this.UrlApi;

    }

    getTipoFuncions(): Observable<TipoFuncion[]> {
        return this.http.get<TipoFuncion[]>(`${this.baseUrl}/findalltipofuncionpersonal`);
    }
}
