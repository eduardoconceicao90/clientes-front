import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getCliente(): Cliente {
    let cliente : Cliente = new Cliente();
    cliente.nome = 'Eduardo';
    cliente.cpf = '00000000000';
    return cliente;
  }
}
