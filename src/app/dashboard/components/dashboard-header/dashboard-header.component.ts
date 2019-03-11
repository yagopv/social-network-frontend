import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faHackerrank } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../../environments/environment.prod';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faThList, faTh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sn-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  logo = faHackerrank;
  title = environment.siteName;

  @Output() selectIcon = new EventEmitter();

  iconList: IconProp = faThList;
  iconGrid: IconProp = faTh;

  headerIconClick(type: string) {
    this.selectIcon.emit(type);
  }
}
