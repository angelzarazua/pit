import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GruposService } from 'src/app/core/services/grupos/grupos.service';
import { Grupo, Usuario_Grupo } from 'src/app/shared/models/local';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.scss']
})
export class CrearGrupoComponent implements OnInit {

  uid: string = "B3GaoDieZBQVmsCuwRaLwFxUNkz2"
  grupos: any = []

  constructor(private grupoSerevice: GruposService) { }

  ngOnInit(): void {
    // this.crearGrupo()
    // this.obtenerGrupos()
  }

  crearGrupo() {
    const grupo: Grupo = {
      nombre: "Hora honesta",
      codigo_grupo: "",
      descripcion: "Sientete libre en decir la verdad",
      asignaturas: [],
      created_at: null,
      updated_at: null
    }

    this.grupoSerevice.crearGrupo(grupo, this.uid).then(() => {
      console.log('Se creó');
    })
  }

}
