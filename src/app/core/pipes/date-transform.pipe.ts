import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transform(value): string {
    switch (value) {
      case '01':
        value = 'Jan';
        break;
      case '02':
        value = 'Feb';
        break;
      case '03':
        value = 'Mar';
        break;
      case '04':
        value = 'Apr';
        break;
      case '05':
        value = 'May';
        break;
      case '06':
        value = 'Jun';
        break;
      case '07':
        value = 'Jul';
        break;
      case '08':
        value = 'Aug';
        break;
      case '09':
        value = 'Sep';
        break;
      case '10':
        value = 'Oct';
        break;
      case '11':
        value = 'Nov';
        break;
      case '12':
        value = 'Dec';
        break;
    }
    return value.replace(value, value);
  }

}
