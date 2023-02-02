import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';

@Component({
  selector: 'app-servico-prestado-list',
  templateUrl: './servico-prestado-list.component.html',
  styleUrls: ['./servico-prestado-list.component.css']
})
export class ServicoPrestadoListComponent implements OnInit {

  nome: any;
  mes: any;
  meses: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  lista?: ServicoPrestadoBusca[];

  constructor(
        private service: ServicoPrestadoService,
        private toast: ToastrService
        ) { }

  ngOnInit(): void {
  }

  find() {
    this.service.find(this.nome, this.mes).subscribe(resposta => {
      this.lista = resposta;
      if(this.lista.length <= 0){
        this.toast.error('Nenhum registro encontrado!')
      }
    })
  }

  limparCampos(){
    this.nome = null;
    this.mes = null;
    this.lista = [];
  }
}
