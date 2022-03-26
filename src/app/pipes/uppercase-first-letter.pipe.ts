import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseFirstLetter'
})
export class UppercaseFirstLetterPipe implements PipeTransform {

  transform(value: string) {
    return value.charAt(0).toUpperCase() + value.substring(1);
  }

}
