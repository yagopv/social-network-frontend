import { Component } from '@angular/core';
import {
  faSearch,
  faUsers,
  faComments
} from '@fortawesome/free-solid-svg-icons';

import { HeroModel } from '../../models/hero.model';

@Component({
  selector: 'hab-welcome-hero',
  templateUrl: './welcome-hero.component.html',
  styleUrls: ['./welcome-hero.component.scss']
})
export class WelcomeHeroComponent {
  rows: HeroModel[] = [
    { id: 1, icon: faSearch, message: 'Encuentra gente con tus intereses' },
    { id: 2, icon: faUsers, message: 'Crea tu red de amigos' },
    { id: 3, icon: faComments, message: 'Mantente en contacto' }
  ];
}
