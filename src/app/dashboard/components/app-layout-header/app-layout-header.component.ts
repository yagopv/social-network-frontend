import { Component, OnInit } from '@angular/core';
import { faHackerrank } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'hab-app-layout-header',
  templateUrl: './app-layout-header.component.html',
  styleUrls: ['./app-layout-header.component.scss']
})
export class AppLayoutHeaderComponent implements OnInit {
  logo = faHackerrank;

  ngOnInit() {}
}
