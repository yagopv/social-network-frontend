import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { GridLayoutProjectionComponent } from './components/grid-layout-projection/grid-layout-projection.component';
import { GridLayoutTemplateComponent } from './components/grid-layout-template/grid-layout-template.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent, GridLayoutProjectionComponent],
  exports: [NotFoundComponent, GridLayoutTemplateComponent]
})
export class SharedModule {}
