import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'sn-header',
  template: `
    <nav class="navbar navbar-dark bg-primary text-light">
      <a class="navbar-brand" [routerLink]="navigateToHome()"
        ><i class="fas fa-users"></i> The Social Network</a
      >
    </nav>
  `,
  styles: [
    `
      nav a {
        font-size: 1.5rem;
        font-family: 'Permanent Marker', cursive;
      }
    `
  ]
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  navigateToHome() {
    if (this.authService.isAuthenticated()) {
      return '/wall';
    }

    return '/welcome';
  }
}
