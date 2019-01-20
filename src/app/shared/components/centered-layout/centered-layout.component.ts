import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-centered-layout',
  template: `
    <section>
      <div><router-outlet></router-outlet></div>
    </section>
  `,
  styleUrls: ['./centered-layout.component.scss']
})
export class CenteredLayoutComponent {}
