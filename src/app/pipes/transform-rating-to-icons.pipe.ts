import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformRatingToIcons'
})
export class TransformRatingToIconsPipe implements PipeTransform {

  transform(value: number) {
    return value < 5 ? '❤️'.repeat(value) + '🤍'.repeat(5-value) : '❤️'.repeat(value);
  }

}
