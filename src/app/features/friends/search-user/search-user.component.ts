import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  switchMap,
  filter
} from 'rxjs/operators';
import { Friend } from '../../../core/models/user.models';

@Component({
  selector: 'sn-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  @ViewChild('searchInput') input: ElementRef;

  @Output() search = new EventEmitter<string>();

  users: Friend[] = [];

  constructor() {}

  ngOnInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300), // Discard emitted values that take less than the specified time between output
        map((event: any) => event.target.value), // Apply projection with each value from source
        filter(text => text.length > 3), // Filter values
        distinctUntilChanged(), // Only emit when the current value is different than the last
        switchMap(s => of(s)) // Map to observable, complete previous inner observable, emit values
      )
      .subscribe(s => this.search.emit(s));
  }
}
