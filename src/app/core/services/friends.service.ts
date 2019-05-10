import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Friend } from '../core.models';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  friends: Friend[];
  searchResults: Friend[];

  constructor(private http: HttpClient, private userService: UserService) {
    this.getFriends().subscribe();
  }

  getFriends() {
    return this.http
      .get<Friend[]>(`${environment.apiBaseUrl}/user/friends`)
      .pipe(
        tap(friends => {
          this.friends = friends;
          this.searchResults = friends;
        })
      );
  }

  search(text: string) {
    const { currentUser } = this.userService;

    return this.http
      .get<Friend[]>(`${environment.apiBaseUrl}/user/search`, {
        params: { q: text }
      })
      .pipe(
        tap(users => {
          this.searchResults = users
            .filter(
              user =>
                user.uuid !== currentUser.uuid &&
                !this.friends.find(friend => friend.uuid === user.uuid)
            )
            .concat(this.friends);
        })
      );
  }
}
