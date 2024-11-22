import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { LugarComponent } from './lugar/lugar.component';
import { ViajeComponent } from './viaje/viaje.component';
import { EstadosPipe } from './estados.pipe';
import { LugarPipe } from './lugar.pipe';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ViajesPipe } from './viajes.pipe';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { TipoAnuncioComponent } from './tipo-anuncio/tipo-anuncio.component';
import { AnuncioPipe } from './anuncio.pipe';
import { MiComponenteComponent } from './componentes/mi-componente/mi-componente.component';
import { TopProductComponent } from './top-product/top-product.component';
import { TopClientsComponent } from './top-clients/top-clients.component';
import { TopEmployeesComponent } from './top-employees/top-employees.component';
import { LowProductComponent } from './low-product/low-product.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BienvenidaComponent,
    AnuncioComponent,
    LugarComponent,
    ViajeComponent,
    EstadosPipe,
    LugarPipe,
    MiPerfilComponent,
    UsuariosComponent,
    ViajesPipe,
    ReservacionesComponent,
    TipoAnuncioComponent,
    AnuncioPipe,
    MiComponenteComponent,
    TopProductComponent,
    TopClientsComponent,
    TopEmployeesComponent,
    LowProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }