import { Component, OnInit, HostBinding } from '@angular/core';
import { environment } from '../environments/environment';
import { LoaderService } from './core/services/loader.service';
import { startWith, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'sn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = environment.siteName;
  isLoading$: Observable<boolean>;
  @HostBinding('id') routeId;

  constructor(public loaderStore: LoaderService, private router: Router) {
    this.isLoading$ = this.loaderStore.state$.pipe(
      startWith(false),
      delay(0)
    );
  }

  ngOnInit() {
    // Set a general id in order to use host-context
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.routeId = event.url.substring(1);
      }
    });
  }
}
