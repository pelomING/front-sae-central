import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaToDot'
})
export class CommaToDotPipe implements PipeTransform {

  transform(value: string): string {
    // Reemplaza todas las comas por puntos
    return value.replace(/,/g, '.');
  }

}
