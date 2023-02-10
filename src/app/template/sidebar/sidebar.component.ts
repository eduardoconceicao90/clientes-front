import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
        private authService: AuthService,
        private router: Router,
        private toast: ToastrService
        ) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(['login']);
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso!', 'Logout', {timeOut: 4000});
  }

}
