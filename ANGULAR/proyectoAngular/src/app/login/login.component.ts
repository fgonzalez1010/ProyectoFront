import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: any = {};

  constructor(private http: HttpClient) { }

  login() {
    const formularioValido: HTMLFormElement | null = document.getElementById("loginForm") as HTMLFormElement;

    if (formularioValido && formularioValido.reportValidity()) {
      this.servicioLogin().subscribe(
        (u: any) => this.darBienvenida(u),
        (error) => {
          alert("Ocurrió un error en el inicio de sesión. Verifica tu conexión.");
        }
      );
    }
  }

  darBienvenida(response: any) {
    if (response && response.status === "success") {
      const role = response.role;

      // Almacenar el usuario en localStorage si deseas persistir información
      localStorage.setItem("usuario", JSON.stringify(response));

      // Redirigir según el rol
      if (role === "User") {
        location.href = "/anuncio";
      } else if (role === "Admin") {
        location.href = "/viaje";
      }
    } else {
      alert(response?.message || "Usuario o contraseña inválidos.");
    }
  }


  servicioLogin() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post("http://localhost:8080/user/login", this.usuario, httpOptions).pipe(
      catchError((error) => {
        console.error('Error en el servicio de login:', error);
        return of({ status: "error", message: "Error en el servicio de login" });
      })
    );
  }
}
