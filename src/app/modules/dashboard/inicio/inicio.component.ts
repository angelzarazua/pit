import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GruposService } from 'src/app/core/services/grupos/grupos.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  // usuario = of(localStorage.getItem('usuario'))
  uid: string = localStorage.getItem('uid')
  grupos: any = []
  grupo_id: string = ""

  constructor(private grupoSerevice: GruposService) { }

  ngOnInit(): void {
    // this.usuario.subscribe(next => console.log(JSON.parse(next).uid))
    this.obtenerGrupos()
  }

  obtenerGrupos() {
    this.grupoSerevice.obtenerGruposPorIdUsuario(this.uid).subscribe(res => {
      this.grupos = res
      console.log(res);
    })
  }
  
  obtenerGrupoPorId(grupoId: string) {
    this.grupoSerevice.obtenerGrupoPorId(grupoId).subscribe(res => {
      console.log(res);      
    })
  }

}
