import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard.component';
import { GrupoComponent } from './grupo/grupo.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, NavBarComponent, GrupoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
