import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendRequest } from '../core.models';
import { tap, map } from 'rxjs/operators';
import { Store } from '../../shared/store/store';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsService extends Store<FriendRequest[]> {
  constructor(private http: HttpClient) {
    super([]);
    this.getFriendRequests().subscribe(requests => this.setState(requests));
  }

  getPendingRequests() {
    return this.state$.pipe(
      map(friendRequests =>
        friendRequests.filter(friendRequest => !friendRequest.request.confirmed)
      )
    );
  }

  getFriendRequests() {
    return this.http.get<FriendRequest[]>(
      `${environment.apiBaseUrl}/user/friendrequests`
    );
  }

  acceptFriendRequest(uuid: string) {
    return this.http
      .post(`${environment.apiBaseUrl}/user/friendrequests/accept`, {
        uuid
      })
      .pipe(
        tap(() =>
          this.setState(
            this.state.filter(friendRequest => friendRequest.uuid !== uuid)
          )
        )
      );
  }

  addFriend(uuid: string) {
    return this.http.post(`${environment.apiBaseUrl}/user/friendrequests`, {
      friend: uuid
    });
  }
}
