import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { RouterModule } from '@angular/router';
import { CrearGrupoComponent } from '../crear-grupo/crear-grupo.component';


@NgModule({
  declarations: [InicioComponent, CrearGrupoComponent],
  imports: [
    CommonModule,
    InicioRoutingModule
  ],
  exports: [RouterModule]

})
export class InicioModule { }
