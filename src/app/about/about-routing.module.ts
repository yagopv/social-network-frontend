import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from '../shared/components/site-layout/site-layout.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [{ path: 'about', component: AboutComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {}
