import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-app-layout-footer',
  templateUrl: './app-layout-footer.component.html',
  styleUrls: ['./app-layout-footer.component.scss']
})
export class AppLayoutFooterComponent implements OnInit {
  ngOnInit() {
    console.log('onInit - AppLayoutFooterComponent');
  }
}
