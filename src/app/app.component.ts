import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GlobalState } from './shared/store/global.state';

@Component({
  selector: 'hab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(GlobalState.isFetching) isFetching$: Observable<boolean>;

  title = 'hack-a-bos';
}
