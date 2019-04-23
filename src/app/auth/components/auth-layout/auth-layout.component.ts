import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'sn-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  isLogin: boolean;
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.setInitialText();
    });
  }

  ngOnInit() {
    this.setInitialText();
  }

  setInitialText() {
    if (this.router.url === '/auth/register') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }
}
