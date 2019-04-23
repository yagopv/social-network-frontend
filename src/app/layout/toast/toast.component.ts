import { Component } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { LIST_ITEMS_ANIMATION } from '../../shared/animations/list.animation';

@Component({
  selector: 'sn-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [LIST_ITEMS_ANIMATION]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
