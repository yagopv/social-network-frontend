import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Profile } from '../../../auth/models/profile.model';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  switchMap,
  filter
} from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { SearchUsers } from '../../store/friend.actions';

@Component({
  selector: 'sn-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  @ViewChild('searchInput') input: ElementRef;

  users: Profile[] = [];
  constructor(private store: Store) {}

  ngOnInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300), // Discard emitted values that take less than the specified time between output
        map((event: any) => event.target.value), // Apply projection with each value from source
        filter(text => text.length > 3), // Filter values
        distinctUntilChanged(), // Only emit when the current value is different than the last
        switchMap(s => this.store.dispatch(new SearchUsers(s))) // Map to observable, complete previous inner observable, emit values
      )
      .subscribe();
  }
}
