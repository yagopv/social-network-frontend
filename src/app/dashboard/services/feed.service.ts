import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PublishModel } from '../models/publish.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(userId?: string): Observable<PublishModel[]> {
    const path = userId ? `/${userId}` : '/';

    return this.http.get<PublishModel[]>(
      `${environment.apiBaseUrl}/user${path}/feed`
    );
  }
}
