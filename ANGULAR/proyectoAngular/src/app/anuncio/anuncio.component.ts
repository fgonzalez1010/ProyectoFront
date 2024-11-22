import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent {
  anuncios: any = {};
  anuncio: any = {};


  constructor(private http: HttpClient, private router: Router) { // Inyectar Router
    this.buscarAnuncio();
  }

  buscarAnuncio() {
    this.servicioBuscarAnuncio().subscribe(
      (us: any) => this.anuncios = us
    );
  }

  servicioBuscarAnuncio(): Observable<any> {
    return this.http.get("http://localhost:8080/product");
  }

  comprarProducto() {
    this.router.navigate(['/reservaciones']); // Redirigir a /lugar
  }

  guardarLugar() {
    let validarFormulario: any = document.getElementById("guardarLugarForm");
    if (validarFormulario.reportValidity()) {
      this.servicioGuardar().subscribe(
        (u: any) => this.actualizar(u)
      );
    }
  }

  servicioGuardar(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>("http://localhost:8080/product", this.anuncio, httpOptions);
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.anuncio.urlImage = reader.result;
      };
    }
  }

  actualizar(lugar: any) {
    this.buscarAnuncio();
    this.anuncio = {};
  }

  modificar(u: any) {
    this.anuncio = u;
  }

  limpiarFormulario() {
    this.anuncio = {};
  }

  eliminar(u: any) {
    this.servicioEliminarLugar(u).subscribe(
      (us: any) => this.actualizar(us)
    );
  }

  servicioEliminarLugar(u: any): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/product/" + u.productId);
  }
}
