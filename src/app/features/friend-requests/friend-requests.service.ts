import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendRequest } from '../friends/friends.models';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsService {
  constructor(private http: HttpClient) {}

  getFriendRequests() {
    return this.http.get<FriendRequest[]>(
      `${environment.apiBaseUrl}/user/friendrequests`
    );
  }

  acceptFriendRequest(uuid: string) {
    return this.http.post(
      `${environment.apiBaseUrl}/user/friendrequests/accept`,
      {
        uuid
      }
    );
  }

  addFriend(uuid: string) {
    return this.http.post(`${environment.apiBaseUrl}/user/friendrequests`, {
      friend: uuid
    });
  }
}
