import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  ngOnInit() {
    console.log('onInit - SiteLayoutComponent');
  }
}
