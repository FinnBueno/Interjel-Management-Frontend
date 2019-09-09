import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args: string = 'dd/MMMM/yyyy HH:mm'): any {
    const result = super.transform(value, args);
    if (args.indexOf('MMMM') && result !== null) {
      const index = result.indexOf('/') + 1;
      const charAt = result.charAt(index);
      return [result.slice(0, index), charAt.toUpperCase(), result.slice(index + 1)].join('');
    }
    return result;
  }

}
