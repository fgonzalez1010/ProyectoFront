import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.css']
})
export class LugarComponent {
  lugares: any = [];
  lugar: any = {};

  constructor(private http: HttpClient) {
    this.buscarLugares();
  }

  buscarLugares() {
    this.servicioBuscarLugares().subscribe(
      (data: any) => this.lugares = data
    );
  }

  servicioBuscarLugares(): Observable<any> {
    return this.http.get("http://localhost:8080/role");
  }

  actualizar(lugar: any) {
    this.buscarLugares();
    this.lugar = {};
  }

  guardarLugar() {
    let validarFormulario: any = document.getElementById("guardarLugarForm");
    if (validarFormulario.reportValidity()) {
      this.servicioGuardar().subscribe(
        (u: any) => this.actualizar(u)
      );
    }
  }

  servicioGuardar() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(
      "http://localhost:8080/role", this.lugar, httpOptions
    );
  }

  modificar(u: any) {
    this.lugar = u;
  }

  limpiarFormulario() {
    this.lugar = {};
  }

  eliminar(u: any) {
    this.servicioEliminarLugar(u).subscribe(
      () => this.actualizar(u)
    );
  }

  servicioEliminarLugar(u: any): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/role/" + u.roleId);
  }
}
