import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Friend } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private http: HttpClient) {}

  getFriends() {
    return this.http.get<Friend[]>(`${environment.apiBaseUrl}/user/friends`);
  }
}
