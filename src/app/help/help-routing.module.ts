import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from '../shared/components/site-layout/site-layout.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [{ path: '', component: HelpComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {}
