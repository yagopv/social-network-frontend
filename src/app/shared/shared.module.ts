import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from './components/typography/typography.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TypographyComponent],
  exports: [TypographyComponent]
})
export class SharedModule {}
