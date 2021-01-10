import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    RouterModule,
    InicioRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  // exports: [RouterModule]

})
export class InicioModule { }
