import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../../../auth/models/profile.model';
import { AuthService } from '../../../auth/services/auth.service';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  switchMap,
  tap,
  filter
} from 'rxjs/operators';

@Component({
  selector: 'hab-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  @ViewChild('searchInput') input: ElementRef;

  searchIcon: IconProp = faSearch;
  users: Profile[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300), // Discard emitted values that take less than the specified time between output
        map((event: any) => event.target.value), // Apply projection with each value from source
        filter(text => text.length > 3), // Filter values
        distinctUntilChanged(), // Only emit when the current value is different than the last
        switchMap(s => this.authService.search(s)), // Map to observable, complete previous inner observable, emit values
        tap(f => console.log(f))
      )
      .subscribe();
  }
}
