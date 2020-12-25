import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearGrupoComponent } from './crear-grupo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: CrearGrupoComponent
  }
];

@NgModule({
  declarations: [CrearGrupoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrearGrupoModule { }
