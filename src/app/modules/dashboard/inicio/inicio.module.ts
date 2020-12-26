import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    RouterModule,
    InicioRoutingModule,
    FontAwesomeModule,
  ],
  // exports: [RouterModule]

})
export class InicioModule { }
