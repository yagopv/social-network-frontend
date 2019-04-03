import { Component } from '@angular/core';
import {
  faSearch,
  faUsers,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'sn-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  rows: Hero[] = [
    { id: 1, icon: 'fa fa-search', message: 'Find people like you' },
    { id: 2, icon: 'fa fa-users', message: 'Build you friends network' },
    { id: 3, icon: 'fa fa-comments', message: 'Keep in touch' }
  ];
}
