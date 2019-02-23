import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHackerrank } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'sn-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  spinnerIcon: IconProp = faHackerrank;

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }
}
