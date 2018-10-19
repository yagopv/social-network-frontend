import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hab-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss']
})
export class TypographyComponent implements OnInit {
  @Input()
  variant: number;

  @Input()
  weight: 'light' | 'normal' | 'bold' = 'normal';

  constructor() {}

  ngOnInit() {}
}
