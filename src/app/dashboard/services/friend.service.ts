import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Friend } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private http: HttpClient) {}

  getFriends() {
    return this.http.get<Friend[]>(`${environment.apiBaseUrl}/user/friends`);
  }

  getFriendRequests() {
    return this.http.get<Friend[]>(
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