import { Injectable } from '@angular/core';
import { Store } from '../../shared/store/store';
import { WallService } from './wall.service';
import { UserStore } from '../../core/store/user.store';
import { FriendStore } from '../friends/friend.store';
import { tap } from 'rxjs/operators';
import { Auth } from '../../core/models/user.models';
import { Post } from './wall.models';

@Injectable({
  providedIn: 'root'
})
export class WallStore extends Store<Post[]> {
  constructor(
    private wallService: WallService,
    private userStore: UserStore,
    private friendStore: FriendStore
  ) {
    super([]);
  }

  getPosts(postId?: string) {
    this.wallService.getWall(postId).subscribe(posts =>
      this.setState(
        posts.sort((p1, p2) => {
          return p2.createdAt - p1.createdAt;
        })
      )
    );
  }

  addPost({ content, uuid }) {
    const currentUser = this.userStore.state;
    const friends = this.friendStore.state;
    return this.wallService.addPost(content, uuid).pipe(
      tap(post => {
        const newPost: Post = {
          ...post,
          author: currentUser,
          owner: uuid
            ? friends.find(friend => friend.uuid === uuid)
            : currentUser
        };
        this.setState([newPost, ...this.state]);
      })
    );
  }

  deletePost(uuid: string) {
    return this.wallService
      .deletePost(uuid)
      .pipe(
        tap(() => this.setState(this.state.filter(post => post.id !== uuid)))
      );
  }

  addComment(postId: string, message: string, user: Auth) {
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

    return this.wallService.addComment(postId, message).pipe(
      tap(() => {
        this.setState(
          this.state.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                comments: [newComment, ...post.comments]
              };
            }
            return post;
          })
        );
      })
    );
  }

  like(postId: string, user: Auth) {
    const targetPost = this.state.find(post => post.id === postId);
    if (targetPost) {
      if (targetPost.likes.indexOf(user.uuid) === -1) {
        return this.wallService.like(postId).pipe(
          tap(() => {
            this.setState(
              this.state.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    likes: [...post.likes, user.uuid]
                  };
                }
                return post;
              })
            );
          })
        );
      } else {
        return this.wallService.dislike(postId).pipe(
          tap(() => {
            this.setState(
              this.state.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    likes: post.likes.filter(uuid => uuid !== user.uuid)
                  };
                }
                return post;
              })
            );
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
