import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  PublishModel,
  PostCommentModel,
  PostModel
} from '../models/post.model';
import { DashboardModule } from '../dashboard.module';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getFeed(userId?: string): Observable<PostModel[]> {
    const path = userId ? `/${userId}` : '';

    return this.http.get<PostModel[]>(
      `${environment.apiBaseUrl}/user${path}/feed`
    );
  }

  publish(content: string): Observable<PostModel> {
    return this.http.post<PostModel>(`${environment.apiBaseUrl}/post`, {
      content
    });
  }

  addComment(commentId: number, message: string) {
    return this.http.post<PostCommentModel>(
      `${environment.apiBaseUrl}/post/${commentId}/comment`,
      {
        message
      }
    );
  }
}
