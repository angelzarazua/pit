import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../../shared/models/local';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  usuario = of(localStorage.getItem('usuario'))
  loadUsuarios: Promise<boolean>;
  


  constructor() {  }

  ngOnInit(): void {
    console.log(this.usuario);
    this.usuario.subscribe(next => console.log(JSON.parse(next).uid))
    //  forEach(next => console.log(JSON.parse(next).uid))    

  }

}
