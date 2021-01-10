import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GruposService } from 'src/app/core/services/grupos/grupos.service';

declare const $: any;

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
  codigoGrupo = "";
  mostrarError: Boolean;
  msgError: string;

  @ViewChild('f') f: NgForm

  constructor(private grupoSerevice: GruposService, private route: Router) { }

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

  unirseAGrupo() {
    this.codigoGrupo = this.f.value.codigoGrupo.trim()
    this.grupoSerevice.agregarUsuarioAGrupo(this.uid, this.codigoGrupo).subscribe(res => {
      const grupoId = res.grupoId
      $('#unirseGrupoModal').modal('hide');
      this.route.navigateByUrl(`/grupo/${grupoId}`)
    }, error => {
      console.log('Entro a error');
      switch (error.code) {
        case 404:
          console.error(error.message);
          this.setMsgError(error.message)
          break;
        case 409:
          console.error(error.message);
          this.setMsgError(error.message)
        default:
          console.error(error);
          this.setMsgError(error.message)
          break;
      }

    })
  }

  cerrarModal() {
    this.mostrarError = false
    this.f.reset()
  }

  setMsgError(msgError: string) {
    this.msgError = msgError;
    this.mostrarError = true
  }

}
