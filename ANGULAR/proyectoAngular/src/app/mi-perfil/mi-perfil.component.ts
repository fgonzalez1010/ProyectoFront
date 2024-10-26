import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {
  passwords: any = [];
  usuarioSesion: any = {};
  pass: any = {};

  constructor(private http: HttpClient) {
    this.buscarAdmin();
    let t = localStorage.getItem("usuario");
    if (t) {
      this.usuarioSesion = JSON.parse(t);
    }
  }

  buscarAdmin() {
    this.servicioBuscarAdmin().subscribe(
      (us: any) => this.passwords = us
    );
  }

  servicioBuscarAdmin(): Observable<any> {
    return this.http.get("http://localhost:8080/user"); // Cambiado a '/user'
  }

  actualizar(usuario: any) {
    this.buscarAdmin();
    let t = JSON.stringify(usuario);
    localStorage.setItem("usuario", t);
  }

  modificar(u: any) {
    this.pass = u;
  }

  guardarAdmin() {
    let validarFormulario: any = document.getElementById("guardarPassword");
    if (validarFormulario.reportValidity()) {
      this.servicioGuardar().subscribe(
        (u: any) => this.actualizar(u),
        (error) => {
          console.error("Error al guardar:", error);
        }
      );
      this.pass = '';
    }
  }

  servicioGuardar() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(
      `http://localhost:8080/user/${this.usuarioSesion.userId}`, // Cambiado a PUT para actualizar el usuario
      this.pass,
      httpOptions
    );
  }
}
