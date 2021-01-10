import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard.component';
import { GrupoComponent } from './grupo/grupo.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontIconsModule } from 'src/app/shared/font-icons/font-icons.module';


@NgModule({
  declarations: [DashboardComponent, NavBarComponent, GrupoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // FormsModule,
    FontAwesomeModule,
    FontIconsModule,
  ],
})
export class DashboardModule { }
