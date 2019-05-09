import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService extends Store<boolean> {
  constructor() {
    super(false);
  }

  setLoading(isLoading: boolean) {
    this.setState(isLoading);
  }
}
