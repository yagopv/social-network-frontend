import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  ngOnInit() {
    console.log('onInit - WelcomeComponent');
  }
}
