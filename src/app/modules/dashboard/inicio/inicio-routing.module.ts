import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoComponent } from '../grupo/grupo.component';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class InicioRoutingModule { }
