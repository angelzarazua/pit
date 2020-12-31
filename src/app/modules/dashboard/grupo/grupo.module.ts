import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoComponent } from './grupo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: GrupoComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
  ],
  exports: [RouterModule]
})
export class GrupoModule { }
