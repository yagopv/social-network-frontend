import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'sn-centered-layout',
  template: `
    <section>
      <div>
        <router-outlet></router-outlet>

        <!-- https://toddmotto.com/angular-ngif-else-then -->
        <ng-container *ngIf="isLogin; then login; else register">
        </ng-container>

        <ng-template #login>
          <a routerLink="/auth/register"
            ><span>Don't have an account. Create one</span></a
          >
        </ng-template>
        <ng-template #register>
          <a routerLink="/auth/login"
            ><span>Already have an account? Login</span></a
          >
        </ng-template>
      </div>
    </section>
  `,
  styleUrls: ['./centered-layout.component.scss']
})
export class CenteredLayoutComponent implements OnInit {
  isLogin: boolean;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url === '/auth/register') {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  }
}
