import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servico-prestado/servico-prestado';
import { environment } from '../environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-list/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase;

  constructor(private http: HttpClient) { }

  find(nome: any, mes: any): Observable<ServicoPrestadoBusca[]> {
    const httpParams = new HttpParams().set("nome", nome)
                                                    .set("mes", mes ? mes : '');

    const url = this.apiURL + "/servicos-prestados" + "?" + httpParams;
    return this.http.get<any>(url);
  }

  create(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(`${this.apiURL}/servicos-prestados`, servicoPrestado);
  }
}
