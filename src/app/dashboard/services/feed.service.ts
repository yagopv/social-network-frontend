import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PostModel } from '../models/post.model';
import { DashboardModule } from '../dashboard.module';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(userId?: string): Observable<PostModel[]> {
    const path = userId ? `/${userId}` : '';

    return this.http.get<PostModel[]>(
      `${environment.apiBaseUrl}/user${path}/feed`
    );
  }
}
