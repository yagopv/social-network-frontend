import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-app-layout-aside',
  templateUrl: './app-layout-aside.component.html',
  styleUrls: ['./app-layout-aside.component.scss']
})
export class AppLayoutAsideComponent implements OnInit {
  ngOnInit() {
    console.log('onInit - AppLayoutAsideComponent');
  }
}
