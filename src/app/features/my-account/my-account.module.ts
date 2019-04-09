import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [{ path: 'my-account', component: MyAccountComponent }];

@NgModule({
  declarations: [MyAccountComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  providers: []
})
export class MyAccountModule {}