import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'hab-grid-layout-template',
  templateUrl: './grid-layout-template.component.html',
  styleUrls: ['./grid-layout-template.component.scss']
})
export class GridLayoutTemplateComponent {
  @Input() headerTemplate: TemplateRef<any>;
  @Input() navTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() asideTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;

  constructor() {}
}
