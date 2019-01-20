import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PublishModel, PostCommentModel } from '../models/publish.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishService {
  constructor(private http: HttpClient) {}

  publish(content: string): Observable<PublishModel> {
    return this.http.post<PublishModel>(`${environment.apiBaseUrl}/post`, {
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

  getFeed(userId?: string): Observable<PublishModel[]> {
    const path = userId ? `/${userId}` : '/';

    return this.http.get<PublishModel[]>(
      `${environment.apiBaseUrl}/user${path}/feed`
    );
  }
}
