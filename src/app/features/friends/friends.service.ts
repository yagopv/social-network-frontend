import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Friend } from './friends.models';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private http: HttpClient) {}

  getFriends() {
    return this.http.get<Friend[]>(`${environment.apiBaseUrl}/user/friends`);
  }

  search(text: string) {
    return this.http.get<Friend[]>(`${environment.apiBaseUrl}/user/search`, {
      params: { q: text }
    });
  }
}
