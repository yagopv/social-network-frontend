import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-template-driven-form',
  templateUrl: './template-driven-form.component.html'
})
export class TemplateDrivenFormComponent implements OnInit {
  profile = {
    firstName: '',
    lastName: ''
  };

  constructor() {}

  ngOnInit() {}
}
