import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anuncio'
})
export class AnuncioPipe implements PipeTransform {

  transform(value: number, anuncios:any []): string {
    let e : any;
    for(e of anuncios){
      if(value == e.idtipoAnuncio){
        return e.descripcion;
      }
    }
    return "No hay informacion";
  }

}
