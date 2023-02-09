import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente = new Cliente();
  errors = [];

  constructor(
        private service: ClientesService,
        private toast: ToastrService,
        private router: Router,
        private activatedRoute: ActivatedRoute
        ) { }

  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.cliente.id != null){
      this.findById();
    }
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
    });
  }

  onSubmit() {
    if(this.cliente.id) {
      this.service.update(this.cliente).subscribe(() => {
        this.toast.success('Cliente atualizado com sucesso!', 'Atualização');
        this.router.navigate(['clientes/list'])
      }, errorResponse => {
        if(errorResponse.error.errors != null){
          this.errors = errorResponse.error.errors;
          this.toast.error(JSON.stringify(this.errors.join(', ')));
        } else if(errorResponse.error.message != null) {
          this.toast.error(errorResponse.error.message);
        }
      });
    } else{
      this.service.create(this.cliente).subscribe(() => {
        this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro');
        this.router.navigate(['clientes/list'])
      }, errorResponse => {
        if(errorResponse.error.errors != null){
          this.errors = errorResponse.error.errors;
          this.toast.error(JSON.stringify(this.errors.join(', ')));
        } else if(errorResponse.error.message != null) {
          this.toast.error(errorResponse.error.message);
        }
      });
    }
  }

  voltarParaListagem() {
    this.router.navigate(['clientes/list'])
  }
}
