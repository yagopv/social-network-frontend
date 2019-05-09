import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'sn-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  user$;

  constructor(
    private router: Router,
    private userStore: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$ = this.userStore.state$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
