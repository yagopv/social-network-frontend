import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  opened = false;
  title: string;
  content: string;
  buttons: Button[];

  constructor() {}

  open(title: string, content: string, ...buttons: Button[]) {
    this.title = title;
    this.content = content;
    this.buttons = buttons;
    this.opened = true;
  }

  close() {
    this.opened = false;
  }
}

interface Button {
  variant: string;
  label: string;
  action(): any;
}
