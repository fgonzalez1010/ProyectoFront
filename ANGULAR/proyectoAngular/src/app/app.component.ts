import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularEjemp';
  sesionIniciada:boolean = false;

  constructor(){
    let t = localStorage.getItem("usuario");
    if(t){
        this.sesionIniciada = true;
    }
  }

  logout(){
    localStorage.clear();
    location.href = "/";
  }
  
}
