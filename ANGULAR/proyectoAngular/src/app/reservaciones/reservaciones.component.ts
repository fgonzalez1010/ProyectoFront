import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent {
  reservacion:any = [];
  estado:any = [];
  viajes:any = [];

  constructor(private http:HttpClient){
    this.buscarReservacion();
    this.buscarEstados();
    this.buscarViajes();
  }

  buscarReservacion(){
    this.serviciobuscarReservacion().subscribe(
      (us:any) => this.reservacion = us
    )
  }

  serviciobuscarReservacion():Observable<any>{
    return this.http.get("http://localhost:8080/reservacion/buscar");
  }

  //viajes
  buscarViajes(){
    this.serviciobuscarViajes().subscribe(
      (us:any) => this.viajes = us
    )
  }

  serviciobuscarViajes():Observable<any>{
    return this.http.get("http://localhost:8080/viaje/buscar");
  }

  //estados
  buscarEstados(){
    this.servicioBuscarEstados().subscribe(
      (us:any) => this.estado = us
    )
  }

  servicioBuscarEstados():Observable<any>{
    return this.http.get("http://localhost:8080/estado/buscar");
  }
}