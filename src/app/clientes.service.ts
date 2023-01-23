import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:8080/clientes');
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/clientes', cliente);
  }

  getClientes(): Cliente[]{
    let cliente = new Cliente();

    cliente.id = 1;
    cliente.nome = 'Eduardo Conceição';
    cliente.cpf = '000000000000';
    cliente.dataCadastro = '23/01/2023';

    return [cliente]
  }

}
