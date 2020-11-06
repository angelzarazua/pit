import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component:  InicioComponent}
]

@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InicioModule { }
