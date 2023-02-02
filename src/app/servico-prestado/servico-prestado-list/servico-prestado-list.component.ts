import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servico-prestado-list',
  templateUrl: './servico-prestado-list.component.html',
  styleUrls: ['./servico-prestado-list.component.css']
})
export class ServicoPrestadoListComponent implements OnInit {

  nome?: string;
  mes?: number;
  meses: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  constructor() { }

  ngOnInit(): void {
  }

  find() {
    console.log(this.nome, this.mes)
  }

}
