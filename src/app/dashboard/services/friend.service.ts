import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private http: HttpClient) {}

  getFriendRequests() {
    return this.http.get(`${environment.apiBaseUrl}/user/friendrequests`);
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
    return this.http.post(`${environment.apiBaseUrl}/user/friend`, {
      friend: uuid
    });
  }
}
