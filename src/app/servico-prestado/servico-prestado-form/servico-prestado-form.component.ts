import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servico-prestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico = new ServicoPrestado();

  constructor(
        private clienteService: ClientesService,
        private service: ServicoPrestadoService,
        private toast: ToastrService,
        private router: Router,
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
    this.service.create(this.servico).subscribe(resposta => {
      this.toast.success('Serviço cadastrado com sucesso!', 'Cadastro Serviço');
      this.router.navigate(['servico-prestado-list'])
    }, errorResponse => {
      this.toast.error(errorResponse.error.errors)
    });
  }

}
