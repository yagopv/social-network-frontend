import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[snColorizer]'
})
export class ColorizerDirective {
  colors = [
    'red',
    'blue',
    'green',
    'black',
    'yellow',
    'brown',
    'purple',
    'cyan'
  ];

  @HostBinding('style.color') color: string;
  @HostBinding('style.border') border: string;

  @HostListener('keydown') newColor() {
    const randomColor = Math.floor(Math.random() * this.colors.length);

    this.color = this.colors[randomColor];
    this.border = `2px solid ${this.colors[randomColor]}`;
  }
}
