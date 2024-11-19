import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent {
  usuarios: any = [];
  nuevoUsuario: any = {};
  roles: any = [];
  sucursales: any = [];

  constructor(private http: HttpClient) {
    this.buscarUsuarios();
    this.buscarRoles();
    this.buscarSucursales();
  }


  buscarUsuarios() {
    this.servicioBuscarUsuarios().subscribe(
      (us: any) => this.usuarios = us
    );
  }

  servicioBuscarUsuarios(): Observable<any> {
    return this.http.get("http://localhost:8080/user");
  }


  buscarRoles() {
    this.servicioBuscarRoles().subscribe(
      (rs: any) => this.roles = rs
    );
  }

  servicioBuscarRoles(): Observable<any> {
    return this.http.get("http://localhost:8080/role");
  }

  buscarSucursales() {
    this.servicioBuscarSucursales().subscribe(
      (ss: any) => this.sucursales = ss
    );
  }

  servicioBuscarSucursales(): Observable<any> {
    return this.http.get("http://localhost:8080/branch");
  }


  guardarUsuario() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>("http://localhost:8080/user", this.nuevoUsuario, httpOptions).subscribe(
      () => {
        this.buscarUsuarios();
        this.limpiarFormulario();
      }
    );
  }

  limpiarFormulario() {
    this.nuevoUsuario = {};
  }

  eliminarUsuario(id: number) {
    this.http.delete<any>(`http://localhost:8080/user/${id}`).subscribe(
      () => this.buscarUsuarios()
    );
  }
}
