import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { FriendComponent } from './friend/friend.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: 'friends', component: FriendsComponent }];

@NgModule({
  declarations: [FriendComponent, FriendsComponent, SearchUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class FriendsModule {}
