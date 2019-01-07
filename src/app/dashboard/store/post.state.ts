import { State, StateContext, Action } from '@ngxs/store';

import { PostViewModel } from '../models/post.model';
import { GetPosts } from './post.actions';

@State<PostViewModel[]>({
  name: 'posts',
  defaults: []
})
export class PostState {
  constructor() {}

  @Action(GetPosts)
  getPosts({ setState }: StateContext<PostViewModel[]>) {
    setState([
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
    ]);
  }
}
