import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
        private clienteService: ClientesService,
        ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }

  onSubmit() {
    
  }

}
