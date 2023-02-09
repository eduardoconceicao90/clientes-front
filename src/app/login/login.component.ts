import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: any;
  password: any;
  cadastrando: boolean = false;

  errors = [];

  constructor(
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService
    ) { }

  onSubmit(){
    this.authService.tentarLogar(this.username, this.password).subscribe(resposta => {
      const access_token = JSON.stringify(resposta);
      localStorage.setItem('access_token', access_token)
      this.router.navigate(['home']);
    }, errorResponse => {
      this.toast.error('Usuário e/ou senha incorreto(s)!')
    });
  }

  preparaCadastrar(event: any){
    event.preventDefault()
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.create(usuario).subscribe(resposta => {
      this.toast.success('Usuário cadastrado com sucesso! Efetue o login.', 'Cadastro Usuário');
      this.cadastrando = false;
      this.username = '';
      this.password = '';
    }, errorResponse => {
      console.log(errorResponse)
      if(errorResponse.error.errors != null){
        this.errors = errorResponse.error.errors;
        this.toast.error(JSON.stringify(this.errors.join(', ')));
      } else if(errorResponse.error.message != null) {
        this.toast.error(errorResponse.error.message);
      }
    });
  }

}
