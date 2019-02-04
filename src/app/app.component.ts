import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GlobalState } from './shared/store/global.state';
import { environment } from '../environments/environment';

@Component({
  selector: 'hab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(GlobalState.isFetching) isFetching$: Observable<boolean>;

  title = environment.siteName;
}
