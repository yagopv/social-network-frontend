import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
  state$: Observable<T>;
  private subject$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.subject$ = new BehaviorSubject(initialState);
    this.state$ = this.subject$.asObservable();
  }

  get state(): T {
    return this.subject$.getValue();
  }

  setState(nextState: T): void {
    this.subject$.next(nextState);
    this.log(nextState);
  }

  log(nextState: T) {
    console.group(this.constructor.name);
    console.log('old state', this.state);
    console.log('new state', nextState);
    console.groupEnd();
  }
}
