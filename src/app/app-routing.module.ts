import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { PublicGuard } from './core/guard/public.guard';
import { IniciarSesionComponent } from './modules/auth/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './modules/auth/registrarse/registrarse.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('../app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
    // , data: { preload: true }
  },
  { path: 'iniciar-sesion', component: IniciarSesionComponent, canActivate: [PublicGuard] },
  { path: 'registrarse', component: RegistrarseComponent, canActivate: [PublicGuard] },
  { path: 'inicio', redirectTo: '', pathMatch: 'full' },
  // { path: '**', redirectTo: 'dashboard' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })], //, { preloadingStrategy: PreloadAllModules }
  exports: [RouterModule]
})
export class AppRoutingModule { }

// ruta: ActivatedRouteSnapshot
// const pectedRole = route.data.expectedRole;
// { 
//   path: 'admin', 
//   component: AdminComponent, 
//   canActivate: [RoleGuard], 
//   data: { 
//     expectedRole: 'admin'
//   } 
// }

// #k35374a
