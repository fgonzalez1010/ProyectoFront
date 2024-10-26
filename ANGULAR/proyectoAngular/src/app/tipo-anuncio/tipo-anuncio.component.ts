import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tipo-anuncio',
  templateUrl: './tipo-anuncio.component.html',
  styleUrls: ['./tipo-anuncio.component.css']
})

export class TipoAnuncioComponent {
  tipoAnuncios:any = {};
  tipoAnuncio:any ={};

  constructor(private http:HttpClient){
    this.buscarTipoAnuncio();
  }

  buscarTipoAnuncio(){
    this.servicioBuscarTipoAnuncio().subscribe(
      (us:any) => this.tipoAnuncios = us
    )
  }

  servicioBuscarTipoAnuncio():Observable<any>{
    return this.http.get("http://localhost:8080/tipo-anuncio/buscar");
  }

  actualizar(lugar:any){
    this.buscarTipoAnuncio();
    this.tipoAnuncio = {};
  }

  guardarTipoAnuncio(){
    let validarFormulario:any = document.getElementById("guardarTipoAnuncioForm");
    if(validarFormulario.reportValidity()){
      this.servicioGuardar().subscribe(
        (u:any)=> this.actualizar(u)
      )
    }
  }

  servicioGuardar(){
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>
    ("http://localhost:8080/tipo-anuncio/guardar",this.tipoAnuncio,httpOptions);
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.tipoAnuncio.imagen = reader.result;
      };
    }
  }

  modificar(u:any){
    this.tipoAnuncio = u;
  }

  limpiarFormulario(){
    this.tipoAnuncio = {};
  }

  



}
