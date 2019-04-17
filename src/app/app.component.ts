import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { LoaderStore } from './core/store/loader.store';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = environment.siteName;

  constructor(public loaderStore: LoaderStore) {}
}
