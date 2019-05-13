import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendRequest } from '../core.models';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsService {
  friendRequests: FriendRequest[] = [];

  constructor(private http: HttpClient) {
    this.getFriendRequests().subscribe(requests => {
      this.friendRequests = requests;
    });
  }

  getPendingRequests() {
    return this.friendRequests.filter(
      friendRequest => !friendRequest.request.confirmed
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
        tap(() => {
          this.friendRequests = this.friendRequests.filter(
            friendRequest => friendRequest.uuid !== uuid
          );
        })
      );
  }

  addFriend(uuid: string) {
    return this.http.post(`${environment.apiBaseUrl}/user/friendrequests`, {
      friend: uuid
    });
  }
}
