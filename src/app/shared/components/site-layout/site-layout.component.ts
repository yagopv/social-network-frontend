import { Component, OnInit } from '@angular/core';
import { faHackerrank } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'sn-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  logo = faHackerrank;

  ngOnInit() {}
}
