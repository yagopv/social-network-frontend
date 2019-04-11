import { Injectable } from '@angular/core';
import { Store } from '../../shared/store/store';
import { PostService } from './post.service';
import { UserStore } from '../../core/store/user.store';
import { FriendStore } from '../friends/friend.store';
import { tap } from 'rxjs/operators';
import { Auth } from '../../core/models/user.models';
import { Post } from './wall.models';

@Injectable({
  providedIn: 'root'
})
export class PostStore extends Store<Post[]> {
  constructor(
    private postService: PostService,
    private userStore: UserStore,
    private friendStore: FriendStore
  ) {
    super([]);
  }

  getPosts(postId?: string) {
    this.postService.getWall(postId).subscribe(posts =>
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
    return this.postService.addPost(content, uuid).pipe(
      tap(post => {
        const newPost = {
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
    return this.postService
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

    return this.postService.addComment(postId, message).pipe(
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
        return this.postService.like(postId).pipe(
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
        return this.postService.dislike(postId).pipe(
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
