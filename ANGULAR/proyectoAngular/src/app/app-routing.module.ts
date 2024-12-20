import { TopEmployeesComponent } from './top-employees/top-employees.component';
import { TopClientsComponent } from './top-clients/top-clients.component';
import { LowProductComponent } from './low-product/low-product.component';
import { TopProductComponent } from './top-product/top-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { LugarComponent } from './lugar/lugar.component';
import { ViajeComponent } from './viaje/viaje.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { TipoAnuncioComponent } from './tipo-anuncio/tipo-anuncio.component';


const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'bienvenida', component: BienvenidaComponent},
    {path:'anuncio', component: AnuncioComponent},
    {path: 'lugar', component: LugarComponent},
    {path: 'viaje', component: ViajeComponent},
    {path: 'mi-perfil', component: MiPerfilComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'reservaciones', component: ReservacionesComponent},
    {path: 'tipo-anuncio', component: TipoAnuncioComponent},
    {path: 'top-employees', component: TopEmployeesComponent},
    {path: 'top-clients', component: TopClientsComponent},
    {path: 'low-product', component: LowProductComponent},
    {path: 'top-product', component: TopProductComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
