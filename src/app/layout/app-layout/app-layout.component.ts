import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  ngOnInit() {
    console.log('onInit - AppLayoutComponent');
  }
}
