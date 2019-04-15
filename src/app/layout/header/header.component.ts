import { Component } from '@angular/core';
import { AuthStore } from '../../core/store/auth.store';

@Component({
  selector: 'sn-header',
  template: `
    <nav class="navbar navbar-dark bg-primary text-light">
      <a class="navbar-brand" [routerLink]="navigateToHome()">Social Network</a>
    </nav>
  `
})
export class HeaderComponent {
  constructor(private authStore: AuthStore) {}

  navigateToHome() {
    if (this.authStore.isAuthenticated()) {
      return '/wall';
    }

    return '/welcome';
  }
}
