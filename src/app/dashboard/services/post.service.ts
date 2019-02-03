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

  getWall(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/user/wall`);
  }

  getFeed(userId?: string): Observable<Post[]> {
    const path = userId ? `/${userId}` : '';

    return this.http.get<Post[]>(`${environment.apiBaseUrl}/user${path}/feed`);
  }

  addPost(content: string): Observable<Post> {
    return this.http.post<Post>(`${environment.apiBaseUrl}/post`, {
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
}
