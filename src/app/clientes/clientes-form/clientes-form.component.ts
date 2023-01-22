import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;

  constructor(private service: ClientesService) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.salvar(this.cliente).subscribe(resposta => {
      console.log(resposta);
    });
  }

}
