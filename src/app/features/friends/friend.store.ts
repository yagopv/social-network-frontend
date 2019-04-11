import { Store } from '../../shared/store/store';
import { FriendService } from './friends.service';
import { Injectable } from '@angular/core';
import { UserStore } from '../../core/store/user.store';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Friend } from '../../core/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class FriendStore extends Store<Friend[]> {
  search$: Observable<Friend[]>;

  constructor(
    private friendService: FriendService,
    private userStore: UserStore
  ) {
    super([]);
    this.friendService
      .getFriends()
      .subscribe(friends => this.setState(friends));
  }

  getSearchUsers(searchTerm: string) {
    const currentUser = this.userStore.state;

    return this.friendService
      .search(searchTerm)
      .pipe(
        map(users =>
          users
            .filter(
              user =>
                user.uuid !== currentUser.uuid &&
                !this.state.find(friend => friend.uuid === user.uuid)
            )
            .concat(this.state)
        )
      );
  }
}
