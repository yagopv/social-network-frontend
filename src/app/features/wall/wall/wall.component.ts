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
import {
  LIST_ANIMATION,
  LIST_ITEMS_ANIMATION
} from '../../../shared/animations/list.animation';
import { PublisherComponent } from '../../../shared/components/publisher/publisher.component';
import { PostComponent } from '../post/post.component';
import { SocialNetworkUser, Friend } from '../../../core/core.models';
import { Post } from '../wall.models';
import { WallService } from '../wall.service';
import { UserService } from '../../../core/services/user.service';
import { FriendService } from '../../../core/services/friends.service';

@Component({
  selector: 'sn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  animations: [LIST_ANIMATION, LIST_ITEMS_ANIMATION],
  providers: [WallService]
})
export class WallComponent implements OnInit {
  posts$: Observable<Post[]>;
  currentUser$: Observable<SocialNetworkUser>;

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
    private wallService: WallService,
    private userStore: UserService,
    private friendService: FriendService
  ) {}

  ngOnInit() {
    this.posts$ = this.wallService.state$;
    this.currentUser$ = this.userStore.state$;

    // We should subscribe as Angular does not re render if only the param of the route change
    this.route.params.subscribe(routeParams => {
      this.wallService.getWall(routeParams.userId).subscribe();
      if (routeParams.userId) {
        const myFriend = this.friendService.state.find(
          friend => friend.uuid === routeParams.userId
        );
        if (myFriend) {
          this.friend = myFriend;
          this.placeholder = `Leave a comment to ${myFriend.fullName}`;
        }
      } else {
        this.placeholder = 'What are you thinking ?';
      }
      this.postPage = 0;
      this.element.nativeElement.parentElement.scrollTop = 0;
    });
  }

  publishPost(content: string) {
    const uuid = this.friend && this.friend.uuid;
    this.wallService.addPost(content, uuid).subscribe(() => {
      this.publisher.resetContent();
      this.publisher.resetHeight();
    });
  }

  postIdentity(index: number, post: Post) {
    return post.id;
  }
}
