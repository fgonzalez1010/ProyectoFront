import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios:any = [];
  estados:any = [];
  usuario:any = {};
  constructor(private http:HttpClient){
    this.buscarUsuarios();
  }

  buscarUsuarios(){
    this.servicioBuscarUsuarios().subscribe(
      (us:any) => this.usuarios = us
    )
  }

  servicioBuscarUsuarios():Observable<any>{
    return this.http.get("http://localhost:8080/usuario/buscar");
  }

}

