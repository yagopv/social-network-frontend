import { Injectable, DoCheck } from '@angular/core';

window.counter = 0;

// For demonstrate change detection. Play adding or removing change detection from clock and post components
@Injectable({
  providedIn: 'root'
})
export class BaseComponentService implements DoCheck {
  ngDoCheck() {
    window.counter = window.counter + 1;
    console.log(window.counter);
  }
}
