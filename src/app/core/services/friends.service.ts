import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Friend } from '../core.models';
import { Store } from '../../shared/store/store';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService extends Store<Friend[]> {
  search$: Observable<Friend[]>;

  constructor(private http: HttpClient, private userService: UserService) {
    super([]);
    this.getFriends().subscribe(friends => this.setState(friends));
  }

  getFriends() {
    return this.http.get<Friend[]>(`${environment.apiBaseUrl}/user/friends`);
  }

  search(text: string) {
    const currentUser = this.userService.state;

    return this.http
      .get<Friend[]>(`${environment.apiBaseUrl}/user/search`, {
        params: { q: text }
      })
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
