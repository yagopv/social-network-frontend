import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFriendlyDate',
  pure: true
})
export class UserFriendlyDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        return 'Just now';
      }

      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };

      let counter;
      for (const interval of Object.keys(intervals)) {
        counter = Math.floor(seconds / intervals[interval]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + interval + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + interval + 's ago'; // plural (2 days ago)
          }
        }
      }
    }
    return value;
  }
}