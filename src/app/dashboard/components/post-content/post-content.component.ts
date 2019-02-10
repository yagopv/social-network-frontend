import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Post } from '../../models/post.model';
import { markViewDirty } from '@angular/core/src/render3/instructions';
import marked from 'marked';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sn-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostContentComponent implements OnInit {
  @Input() post: Post;
  arrowRight: IconProp = faLongArrowAltRight;
  content: string;

  ngOnInit() {
    this.content = marked(this.post.content);
  }
}
