import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../../core/store/user.store';
import { AuthStore } from '../../../core/store/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'sn-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  user$;

  constructor(
    private router: Router,
    private userStore: UserStore,
    private authStore: AuthStore
  ) {}

  ngOnInit() {
    this.user$ = this.userStore.state$;
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
