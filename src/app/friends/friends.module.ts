import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './components/friends/friends.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FriendsComponent],
  exports: [FriendsComponent]
})
export class FriendsModule {}
