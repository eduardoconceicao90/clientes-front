import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }

  getCliente(): Cliente {
    let cliente : Cliente = new Cliente();
    cliente.nome = 'Eduardo';
    cliente.cpf = '00000000000';
    return cliente;
  }
}
