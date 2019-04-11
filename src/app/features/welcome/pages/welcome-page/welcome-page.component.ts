import { Component } from '@angular/core';
import { Hero } from '../../../../core/models/hero.model';

@Component({
  selector: 'sn-welcome-page',
  templateUrl: './welcome-page.component.html',
  styles: [
    `
      .container-fluid {
        display: block;
        height: 100%;
      }
    `
  ]
})
export class WelcomePageComponent {
  rows: Hero[] = [
    { id: 1, icon: 'fa fa-search', message: 'Find people like you' },
    { id: 2, icon: 'fa fa-users', message: 'Build you friends network' },
    { id: 3, icon: 'fa fa-comments', message: 'Keep in touch' }
  ];
}
