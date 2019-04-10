import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import {
  LIST_ANIMATION,
  LIST_ITEMS_ANIMATION
} from '../../../../shared/animations/list.animation';
import { PublisherComponent } from '../../../../shared/components/publisher/publisher.component';
import { PostComponent } from '../../components/post/post.component';
import { Friend } from '../../../friends/models/friend.model';
import { PostStore } from '../../services/post.store';
import { UserStore } from '../../../../core/store/user.store';
import { Auth } from '../../../auth/models/auth.model';

@Component({
  selector: 'sn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  animations: [LIST_ANIMATION, LIST_ITEMS_ANIMATION]
})
export class WallComponent implements OnInit {
  posts$: Observable<Post[]>;
  currentUser$: Observable<Auth>;

  @ViewChild(PublisherComponent) publisher: PublisherComponent;
  @ViewChildren(PostComponent) posts: QueryList<PostComponent>;

  friend: Friend;
  content: string;
  placeholder = '';
  postPage = 0;
  postPageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private element: ElementRef,
    private postStore: PostStore,
    private userStore: UserStore
  ) {}

  ngOnInit() {
    this.posts$ = this.postStore.state$;
    this.currentUser$ = this.userStore.state$;

    // We should subscribe as Angular does not re render if only the param of the route change
    this.route.params.subscribe(routeParams => {
      this.postStore.getPosts(routeParams.userId);
      if (routeParams.userId) {
        // this.store
        //   .select(FriendsState.getFriend(routeParams.userId))
        //   .subscribe((friend: Friend) => {
        //     if (friend) {
        //       this.friend = friend;
        //       this.placeholder = `Leave a comment to ${friend.fullName}`;
        //     }
        //   });
      } else {
        this.placeholder = 'What are you thinking ?';
      }
      this.postPage = 0;
      this.element.nativeElement.parentElement.scrollTop = 0;
    });

    // this.actions$.pipe(ofAction(AddPostSuccess)).subscribe(() => {
    //   this.publisher.resetContent();
    //   this.publisher.resetHeight();
    // });

    // this.actions$.pipe(ofAction(AddCommentSuccess)).subscribe(({ postId }) => {
    //   const post = this.posts.find(
    //     postComponent => postComponent.post.id === postId
    //   );
    //   if (post) {
    //     post.resetComment();
    //   }
    // });
  }

  publishPost(content: string) {
    const uuid = this.friend && this.friend.uuid;
    this.postStore.addPost({ content, uuid }).subscribe();
  }

  postIdentity(index: number, post: Post) {
    return post.id;
  }
}
