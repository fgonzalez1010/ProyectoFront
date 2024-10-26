import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent {
  usuarios: any = []; // Para almacenar usuarios
  nuevoUsuario: any = {}; // Para crear un nuevo usuario
  roles: any = []; // Para almacenar roles
  sucursales: any = []; // Para almacenar sucursales

  constructor(private http: HttpClient) {
    this.buscarUsuarios(); // Llamada inicial para obtener usuarios
    this.buscarRoles(); // Llamada inicial para obtener roles
    this.buscarSucursales(); // Llamada inicial para obtener sucursales
  }

  // Obtener todos los usuarios
  buscarUsuarios() {
    this.servicioBuscarUsuarios().subscribe(
      (us: any) => this.usuarios = us
    );
  }

  servicioBuscarUsuarios(): Observable<any> {
    return this.http.get("http://localhost:8080/user");
  }

  // Obtener todos los roles
  buscarRoles() {
    this.servicioBuscarRoles().subscribe(
      (rs: any) => this.roles = rs
    );
  }

  servicioBuscarRoles(): Observable<any> {
    return this.http.get("http://localhost:8080/role"); // Cambia la URL según tu backend
  }

  // Obtener todas las sucursales
  buscarSucursales() {
    this.servicioBuscarSucursales().subscribe(
      (ss: any) => this.sucursales = ss
    );
  }

  servicioBuscarSucursales(): Observable<any> {
    return this.http.get("http://localhost:8080/branch"); // Cambia la URL según tu backend
  }

  // Crear un nuevo usuario
  guardarUsuario() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>("http://localhost:8080/user", this.nuevoUsuario, httpOptions).subscribe(
      () => {
        this.buscarUsuarios(); // Actualizar la lista de usuarios después de crear uno nuevo
        this.limpiarFormulario(); // Limpiar el formulario
      }
    );
  }

  limpiarFormulario() {
    this.nuevoUsuario = {}; // Restablecer el formulario
  }

  eliminarUsuario(id: number) {
    this.http.delete<any>(`http://localhost:8080/user/${id}`).subscribe(
      () => this.buscarUsuarios() // Actualizar la lista de usuarios después de eliminar
    );
  }
}
