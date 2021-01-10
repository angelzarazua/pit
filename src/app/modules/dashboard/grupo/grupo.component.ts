import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GruposService } from 'src/app/core/services/grupos/grupos.service';
import { Grupo } from 'src/app/shared/models/local';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {
  grupo: Grupo;
  grupoId: string;
  nombre: string = ''
  descripcion: string = ''
  cargando: boolean = true;
  editarNombre: boolean = false;
  editarDescripcion: boolean = false;
  iconDescripcion: string = "pen"
  iconNombre: string = "pen"
  nameChange: string = ''

  constructor(
    private grupoSerevice: GruposService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.obtenerGrupo()
    this.nombre = this.grupo.nombre
    this.nameChange = this.grupo.nombre
    this.descripcion = this.grupo.descripcion
    console.log(this.nombre, ' ', this.descripcion);
    
  }

  obtenerGrupo() {
    return new Promise((resolve, reject) => {
      this.route.paramMap.pipe(
        switchMap(params => {
          this.grupoId = String(params.get('id'));
          return this.grupoSerevice.obtenerGrupoPorId(this.grupoId);
        })
      ).subscribe((res: Grupo) => {
        this.cargando = false;
        resolve(this.grupo = res)
      })
    })

  }

  aparecerInput(tipo: string) {
    this.nombre = (this.nombre).trim();

    if (tipo == 'nombre') {
      this.iconNombre == 'check' && this.nameChange != (this.nombre).trim() ? this.editarGrupo() : null
      this.iconNombre = this.iconNombre == 'check' ? 'pen' : 'check'

      this.editarNombre = !this.editarNombre
    } else {
      this.iconDescripcion == 'check' ? this.editarGrupo() : null
      this.iconDescripcion = this.iconDescripcion == 'check' ? 'pen' : 'check'
      this.editarDescripcion = !this.editarDescripcion
    }
  }

  editarGrupo() {
    this.nameChange = (this.nombre).trim();
    console.log('Entro a editar');
    this.grupo.nombre = (this.nombre).trim();
    this.grupo.descripcion = (this.descripcion).trim();
    this.grupoSerevice.editarGrupo(this.grupo, this.grupoId).subscribe()
  }
}
