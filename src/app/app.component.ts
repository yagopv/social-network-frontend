import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GlobalState } from './shared/store/global.state';
import { environment } from '../environments/environment';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styles: [
    `
      main {
        height: 100vh;
      }
    `
  ]
})
export class AppComponent {
  @Select(GlobalState.isFetching) isFetching$: Observable<boolean>;

  title = environment.siteName;
}
