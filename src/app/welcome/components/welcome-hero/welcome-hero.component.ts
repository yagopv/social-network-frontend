import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'sn-welcome-hero',
  templateUrl: './welcome-hero.component.html'
})
export class WelcomeHeroComponent {
  @Input() rows: Hero[];
}
