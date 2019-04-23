import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [{ path: 'my-account', component: MyAccountComponent }];

@NgModule({
  declarations: [MyAccountComponent, ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class MyAccountModule {}
