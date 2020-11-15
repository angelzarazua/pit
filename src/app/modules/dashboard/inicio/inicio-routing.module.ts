import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearGrupoComponent } from '../crear-grupo/crear-grupo.component';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent, children: [
      {
        path: 'crear-grupo', component: CrearGrupoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
