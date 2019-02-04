import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FriendsState } from '../../store/friend.state';
import { Friends } from '../../models/friends.model';
import { Observable } from 'rxjs';
import { GetFriends, AddFriend } from '../../store/friend.actions';

@Component({
  selector: 'sn-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Select(FriendsState.getSearchFriends) friends$: Observable<Friends>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetFriends());
  }

  addFriend(uuid: string) {
    this.store.dispatch(new AddFriend(uuid));
  }

  removeFriend(uuid: string) {
    console.log(uuid);
  }
}
