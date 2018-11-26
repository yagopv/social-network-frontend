import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hab-not-found-component',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  ngOnInit() {
    console.log('onInit - NotFoundComponent');
  }
}
