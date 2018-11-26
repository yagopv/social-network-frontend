import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-form-wrapper',
  template: '<ng-content></ng-content>',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit {
  ngOnInit() {
    console.log('onInit - FormWrapperComponent');
  }
}
