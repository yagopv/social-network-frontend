import { Component, OnInit } from '@angular/core';
import { faHackerrank } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'sn-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  logo = faHackerrank;
  title = environment.siteName;
  ngOnInit() {}
}
