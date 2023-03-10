import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiURL}/clientes`);
  }

  findById(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiURL}/clientes/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiURL}/clientes`, cliente);
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiURL}/clientes/${cliente.id}`, cliente);
  }

  delete(id: any): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/clientes/${id}`);
  }

}
