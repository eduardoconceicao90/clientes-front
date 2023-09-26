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
    }, () => {
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
    this.authService.create(usuario).subscribe(() => {
      this.toast.success('Usuário cadastrado com sucesso! Efetue o login.', 'Cadastro Usuário');
      this.cadastrando = false;
      this.username = '';
      this.password = '';
    }, errorResponse => {
      this.toast.error(errorResponse.error.errors);
    });
  }

}
