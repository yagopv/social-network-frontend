import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'sn-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public modalService: ModalService) {}
}
