import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lugar'
})
export class LugarPipe implements PipeTransform {

  transform(value: number, lugares:any []): string {
    let e : any;
    for(e of lugares){
      if(value == e.idlugar){
        return e.nombre;
      }
    }
    return "No hay informacion";
  }

}
