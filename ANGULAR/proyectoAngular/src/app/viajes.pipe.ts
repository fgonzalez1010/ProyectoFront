import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viajes'
})
export class ViajesPipe implements PipeTransform {

    transform(value: number, viajes:any []): string {
    let e : any;
    for(e of viajes){
      if(value == e.idviaje){
        return e.descripcion;
      }
    }
    return "No hay informacion";
  }
}