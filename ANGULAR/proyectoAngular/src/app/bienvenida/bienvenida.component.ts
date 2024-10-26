import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/' + route]);
  }

  Anuncio() {
    this.navigateTo('anuncio');
  }

  Viaje() {
    this.navigateTo('viaje');
  }
}
