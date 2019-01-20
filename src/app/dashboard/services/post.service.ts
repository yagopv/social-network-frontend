import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PublishModel, PostCommentModel } from '../models/post.model';
import { Observable } from 'rxjs';
import { DashboardModule } from '../dashboard.module';

@Injectable({
  providedIn: DashboardModule
})
export class PostService {
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
}
