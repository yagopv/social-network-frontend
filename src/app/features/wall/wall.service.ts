import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Post } from './wall.models';
import { UserService } from '../../core/services/user.service';
import { FriendService } from '../../core/services/friends.service';
import { tap } from 'rxjs/operators';
import { SocialNetworkUser } from '../../core/core.models';

@Injectable()
export class WallService {
  posts: Post[] = [];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private friendsService: FriendService
  ) {}

  getWall(userId?: string): Observable<Post[]> {
    const path = userId ? `/${userId}` : '';
    let owner = null;

    if (userId) {
      owner = this.friendsService.friends.find(
        friend => friend.uuid === userId
      );
    }

    return this.http
      .get<Post[]>(`${environment.apiBaseUrl}/user/wall${path}`)
      .pipe(
        tap(posts => {
          this.posts = posts.sort((p1, p2) => {
            return p2.createdAt - p1.createdAt;
          });

          if (userId) {
            this.posts = this.posts.map(post => {
              post.owner = owner;
              return post;
            });
          }
        })
      );
  }

  addPost(content: string, userId?: string): Observable<Post> {
    const path = userId ? `/${userId}` : '';

    const { currentUser } = this.userService;
    const { friends } = this.friendsService;

    return this.http
      .post<Post>(`${environment.apiBaseUrl}/post${path}`, {
        content
      })
      .pipe(
        tap(post => {
          const newPost: Post = {
            ...post,
            author: currentUser,
            owner: userId
              ? friends.find(friend => friend.uuid === userId)
              : currentUser
          };
          this.posts = [newPost, ...this.posts];
        })
      );
  }

  deletePost(uuid: string) {
    return this.http.delete(`${environment.apiBaseUrl}/post/${uuid}`).pipe(
      tap(() => {
        this.posts = this.posts.filter(post => post.id !== uuid);
      })
    );
  }

  addComment(postId: string, message: string, user: SocialNetworkUser) {
    const newComment = {
      id: this.uuidv4(),
      message,
      createdAt: new Date().getTime(),
      author: {
        uuid: user.uuid,
        avatarUrl: user.avatarUrl,
        fullName: user.fullName
      }
    };

    return this.http
      .post<Comment>(`${environment.apiBaseUrl}/post/${postId}/comment`, {
        message
      })
      .pipe(
        tap(() => {
          this.posts = this.posts.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                comments: [newComment, ...post.comments]
              };
            }
            return post;
          });
        })
      );
  }

  like(postId: string, user: SocialNetworkUser) {
    const targetPost = this.posts.find(post => post.id === postId);
    if (targetPost) {
      if (targetPost.likes.indexOf(user.uuid) === -1) {
        return this.http
          .post(`${environment.apiBaseUrl}/post/${postId}/like`, {})
          .pipe(
            tap(() => {
              this.posts = this.posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    likes: [...post.likes, user.uuid]
                  };
                }
                return post;
              });
            })
          );
      } else {
        return this.http
          .delete(`${environment.apiBaseUrl}/post/${postId}/like`, {})
          .pipe(
            tap(() => {
              this.posts = this.posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    likes: post.likes.filter(uuid => uuid !== user.uuid)
                  };
                }
                return post;
              });
            })
          );
      }
    }
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line
      let r = (Math.random() * 16) | 0, // tslint:disable-line
        v = c == 'x' ? r : (r & 0x3) | 0x8; // tslint:disable-line
      return v.toString(16);
    });
  }
}
