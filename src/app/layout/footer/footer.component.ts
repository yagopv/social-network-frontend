import { Component } from '@angular/core';

@Component({
  selector: 'sn-footer',
  template: `
    <nav class="navbar navbar-dark bg-primary text-light">
      <span>@Yago Pérez Vázquez 2019</span>
      <a routerLink="/about" class="btn btn-link text-light">About</a>
    </nav>
  `
})
export class FooterComponent {}
