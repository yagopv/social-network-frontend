import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendRequest } from '../../../core/core.models';
import { FriendRequestsStore } from '../../../core/store/friend-requests.store';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'sn-friend-requests',
  templateUrl: './friend-requests.component.html'
})
export class FriendRequestsComponent implements OnInit {
  requests$: Observable<FriendRequest[]>;

  constructor(
    private friendRequestsStore: FriendRequestsStore,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.requests$ = this.friendRequestsStore.getPendingRequests();
  }

  acceptRequest({ uuid, fullName }: FriendRequest) {
    this.friendRequestsStore
      .acceptFriendRequest(uuid)
      .subscribe(() =>
        this.modalService.open(
          'You have a new friend !!',
          `You and ${fullName} are now friends`
        )
      );
  }
}
