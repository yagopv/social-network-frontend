import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsGridComponent } from './containers/friends-grid/friends-grid.component';
import { FriendComponent } from './components/friend/friend.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FriendsGridComponent, FriendComponent],
  exports: [FriendsGridComponent]
})
export class FriendsModule {}
