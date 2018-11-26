import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hab-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent {
  @Input() imageUrl: string;
}
