import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './post.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PostViewModel } from './post.model';

const posts: PostViewModel[] = [
  {
    user: {
      id: 2,
      name: 'Juan Antonio Rodriguez',
      avatar: 'http://i.pravatar.cc/128?img=2'
    },
    datetime: 1543924629944,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra scelerisque lectus, quis commodo eros fermentum vitae. Nulla a ante quis lectus vestibulum tempor ut sed libero',
    comments: [
      {
        user: {
          id: 3,
          name: 'Teresa',
          avatar: 'http://i.pravatar.cc/128?img=3'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 4,
          name: 'Juan Antonio',
          avatar: 'http://i.pravatar.cc/128?img=4'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 1,
          name: 'Yago Pérez',
          avatar: 'http://i.pravatar.cc/128?img=1'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      }
    ]
  },
  {
    user: {
      id: 2,
      name: 'Juan Antonio Rodriguez',
      avatar: 'http://i.pravatar.cc/128?img=2'
    },
    datetime: 1543924629944,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra scelerisque lectus, quis commodo eros fermentum vitae. Nulla a ante quis lectus vestibulum tempor ut sed libero',
    comments: [
      {
        user: {
          id: 3,
          name: 'Teresa',
          avatar: 'http://i.pravatar.cc/128?img=3'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 4,
          name: 'Juan Antonio',
          avatar: 'http://i.pravatar.cc/128?img=4'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 1,
          name: 'Yago Pérez',
          avatar: 'http://i.pravatar.cc/128?img=1'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      }
    ]
  },
  {
    user: {
      id: 2,
      name: 'Juan Antonio Rodriguez',
      avatar: 'http://i.pravatar.cc/128?img=2'
    },
    datetime: 1543924629944,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra scelerisque lectus, quis commodo eros fermentum vitae. Nulla a ante quis lectus vestibulum tempor ut sed libero',
    comments: [
      {
        user: {
          id: 3,
          name: 'Teresa',
          avatar: 'http://i.pravatar.cc/128?img=3'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 4,
          name: 'Juan Antonio',
          avatar: 'http://i.pravatar.cc/128?img=4'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      },
      {
        user: {
          id: 1,
          name: 'Yago Pérez',
          avatar: 'http://i.pravatar.cc/128?img=1'
        },
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        datetime: 1543924629944
      }
    ]
  }
];

@Injectable()
export class PostEffects {
  @Effect() getPosts$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.PostActionTypes.GetPosts),
    switchMap(action => {
      console.log(action);
      return of(new fromActions.GetPostsSuccess(posts));
    })
  );

  constructor(private actions$: Actions) {}
}
