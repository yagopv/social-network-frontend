import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './modal.service';

const notifications = {
  'account-activated': {
    title: 'Activation success',
    message: 'Your account was successfully activated'
  },
  'account-not-activated': {
    title: 'Activation failed',
    message: 'Please try again or contact with us'
  }
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.notification && notifications[params.notification]) {
        const { title, message } = notifications[params.notification];
        this.modalService.open(title, message);
      }
    });
  }
}
