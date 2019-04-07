import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './containers/wall/wall.component';
import { PrivateWallComponent } from './components/private-wall/private-wall.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'wall', component: WallComponent },
      { path: 'user/:userId/wall', component: WallComponent },
      { path: 'user/:userId/private/wall', component: PrivateWallComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
