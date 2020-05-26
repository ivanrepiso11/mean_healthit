import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EjercicioListComponent } from './components/ejercicio-list/ejercicio-list.component';
import { EjercicioPreviewComponent } from './components/ejercicio-preview/ejercicio-preview.component';
import { EjercicioFormComponent } from './components/ejercicio-form/ejercicio-form.component';
import { EjercicioEditComponent } from './components/ejercicio-edit/ejercicio-edit.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent
  },
  {
    path: 'ejercicios', component: EjercicioListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ejercicios/:id', component: EjercicioPreviewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ejercicios/admin/new', component: EjercicioFormComponent, canActivate: [AdminGuard]
  },
  {
    path: 'ejercicios/admin/:id', component: EjercicioEditComponent, canActivate: [AdminGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registro', component: RegistroComponent
  },
  {
    path: 'usuarios', component: UsuarioListComponent, canActivate: [AdminGuard]
  },
  {
    path: 'usuarios/:id', component: PerfilComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: 'ejercicios', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
