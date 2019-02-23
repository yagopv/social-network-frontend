import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sn-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() pageSize: number;
  @Input() count: number;
  @Input() type: string;
  @Input() showMoreText: string;
  @Input() showLessText: string;

  // Two-way data binding
  // https://blog.thoughtram.io/angular/2016/10/13/two-way-data-binding-in-angular-2.html
  @Input() page: number;
  @Output() pageChange = new EventEmitter();

  moreCommentsIcon = faPlusCircle;
  lessCommentsIcon = faMinusCircle;

  changePage(page: number) {
    this.pageChange.emit(page);
  }

  constructor() {}

  ngOnInit() {}
}
