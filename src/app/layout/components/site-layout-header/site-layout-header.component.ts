import { Component, OnInit } from '@angular/core';
import { faHackerrank } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'hab-site-layout-header',
  templateUrl: './site-layout-header.component.html',
  styleUrls: ['./site-layout-header.component.scss']
})
export class SiteLayoutHeaderComponent implements OnInit {
  logo = faHackerrank;

  ngOnInit() {}
}
