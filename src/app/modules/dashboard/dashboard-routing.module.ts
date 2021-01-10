import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'crear-grupo', loadChildren: () => import('./crear-grupo/crear-grupo.module').then(m => m.CrearGrupoModule)
      },
      {
        path: 'grupo/:id', loadChildren: () => import('./grupo/grupo.module').then(m => m.GrupoModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
