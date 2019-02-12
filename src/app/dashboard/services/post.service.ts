import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getWall(userId?: string): Observable<Post[]> {
    const path = userId ? `/${userId}` : '';

    return this.http.get<Post[]>(`${environment.apiBaseUrl}/user/wall${path}`);
  }

  addPost(content: string, userId?: string): Observable<Post> {
    const path = userId ? `/${userId}` : '';

    return this.http.post<Post>(`${environment.apiBaseUrl}/post${path}`, {
      content
    });
  }

  deletePost(uuid: string) {
    return this.http.delete(`${environment.apiBaseUrl}/post/${uuid}`);
  }

  addComment(postId: string, message: string) {
    return this.http.post<Comment>(
      `${environment.apiBaseUrl}/post/${postId}/comment`,
      {
        message
      }
    );
  }

  like(postId: string) {
    return this.http.post(`${environment.apiBaseUrl}/post/${postId}/like`, {});
  }

  dislike(postId: string) {
    return this.http.delete(
      `${environment.apiBaseUrl}/post/${postId}/like`,
      {}
    );
  }
}
