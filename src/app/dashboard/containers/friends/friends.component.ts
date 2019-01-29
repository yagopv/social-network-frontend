import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { FriendsState } from '../../store/friend.state';
import { Friends } from '../../models/friends.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'hab-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Select(FriendsState.getSearchFriends) friends$: Observable<Friends>;

  constructor() {}

  ngOnInit() {}

  addFriend(uuid: string) {
    console.log(uuid);
  }

  removeFriend(uuid: string) {
    console.log(uuid);
  }
}
