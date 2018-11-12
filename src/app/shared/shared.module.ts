import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent]
})
export class SharedModule {}
