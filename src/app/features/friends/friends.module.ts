import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './pages/friends/friends.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { FriendComponent } from './components/friend/friend.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: 'friends', component: FriendsComponent }];

@NgModule({
  declarations: [FriendComponent, FriendsComponent, SearchUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class FriendsModule {}
