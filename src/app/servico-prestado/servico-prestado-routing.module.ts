import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListComponent } from './servico-prestado-list/servico-prestado-list.component';

const routes: Routes = [
  { path: 'servico-prestado-form', component: ServicoPrestadoFormComponent },
  { path: 'servico-prestado-list', component: ServicoPrestadoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPrestadoRoutingModule { }
