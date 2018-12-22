import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-centered-layout',
  template: `
    <hab-container>
      <div><router-outlet></router-outlet></div>
    </hab-container>
  `,
  styleUrls: ['./centered-layout.component.scss']
})
export class CenteredLayoutComponent {}
