import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { LoaderStore } from './core/store/loader.store';
import { startWith, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = environment.siteName;

  isLoading$: Observable<boolean>;

  constructor(public loaderStore: LoaderStore) {
    this.isLoading$ = this.loaderStore.state$.pipe(
      startWith(false),
      delay(0)
    );
  }
}
