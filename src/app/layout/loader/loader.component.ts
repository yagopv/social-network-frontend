import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'sn-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }
}
