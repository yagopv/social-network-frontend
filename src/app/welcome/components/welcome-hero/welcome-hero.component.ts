import { Component } from '@angular/core';
import {
  faSearch,
  faUsers,
  faComments
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hab-welcome-hero',
  templateUrl: './welcome-hero.component.html',
  styleUrls: ['./welcome-hero.component.scss']
})
export class WelcomeHeroComponent {
  search = faSearch;
  people = faUsers;
  messages = faComments;
}
