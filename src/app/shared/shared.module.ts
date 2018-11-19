import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { GridLayoutProjectionComponent } from './components/grid-layout-projection/grid-layout-projection.component';
import { GridLayoutTemplateComponent } from './components/grid-layout-template/grid-layout-template.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NotFoundComponent,
    GridLayoutTemplateComponent,
    GridLayoutProjectionComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    NotFoundComponent,
    GridLayoutTemplateComponent,
    GridLayoutProjectionComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {}
