import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado = new Cliente();

  constructor(
        private service: ClientesService,
        private router: Router,
        private toast: ToastrService
        ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }

  novoCadastro(){
    this.router.navigate(['clientes-form'])
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  deletar(){
    this.service.delete(this.clienteSelecionado.id).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso!', 'Deleção');
      this.ngOnInit();
    }, errorResponse => {
      this.toast.error("Ocorreu um erro ao deletar o cliente!")
    });
  }
}
