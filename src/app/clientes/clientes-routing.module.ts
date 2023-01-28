import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';

const routes: Routes = [
  { path:'clientes-form', component: ClientesFormComponent },
  { path:'clientes-form/:id', component: ClientesFormComponent },
  { path:'clientes-list', component: ClientesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
