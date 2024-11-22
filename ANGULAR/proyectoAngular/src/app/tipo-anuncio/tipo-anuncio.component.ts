import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tipo-anuncio', // Selector adaptado
  templateUrl: './tipo-anuncio.component.html',
  styleUrls: ['./tipo-anuncio.component.css']
})
export class TipoAnuncioComponent {
  anuncios: any = {}; // Lista de anuncios
  anuncio: any = {};  // Anuncio actual para edición o creación

  constructor(private http: HttpClient) {
    this.buscarAnuncio();
  }

  // Método para obtener todos los anuncios
  buscarAnuncio() {
    this.servicioBuscarAnuncio().subscribe(
      (us: any) => this.anuncios = us
    );
  }

  servicioBuscarAnuncio(): Observable<any> {
    return this.http.get("http://localhost:8080/product");
  }

  // Método para guardar un anuncio
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

  // Método para manejar la imagen en formato Base64
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

  // Método para actualizar la lista de anuncios y limpiar el formulario
  actualizar(lugar: any) {
    this.buscarAnuncio();
    this.anuncio = {};
  }

  // Método para editar un anuncio existente
  modificar(u: any) {
    this.anuncio = u;
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.anuncio = {};
  }

  // Método para eliminar un anuncio
  eliminar(u: any) {
    this.servicioEliminarLugar(u).subscribe(
      (us: any) => this.actualizar(us)
    );
  }

  servicioEliminarLugar(u: any): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/product/" + u.productId);
  }
}
