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
  nombre = ''
  editar: boolean = false;
  textButton = 'Edit'

  constructor(
    private grupoSerevice: GruposService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.obtenerGrupo()
    this.nombre = this.grupo.nombre
  }

  obtenerGrupo() {
    return new Promise((resolve, reject) => {
      this.route.paramMap.pipe(
        switchMap(params => {
          this.grupoId = String(params.get('id'));
          return this.grupoSerevice.obtenerGrupoPorId(this.grupoId);
        })
      ).subscribe((res: Grupo) => {
        resolve(this.grupo = res)
      })
    })

  }

  aparecerInput() {
    console.log('Hola');
    if (!this.editar) {
      this.editar = true
      this.textButton = 'List'  
    } else {
      this.editar = false
      this.textButton = 'Edit'
    }  

  }


}
