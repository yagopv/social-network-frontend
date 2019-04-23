import { Injectable } from '@angular/core';
import { Error } from '../core.models';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];

  constructor() {}

  addToast(
    title: string,
    message: string,
    variant: TOAST = TOAST.PRIMARY,
    delay: number = 5000
  ) {
    this.toasts.unshift({
      title,
      message,
      variant,
      delay
    });
  }

  addErrorToast(error: Error, delay?: number) {
    this.toasts.unshift({
      title: 'Error',
      message: this.getErrorMessage(error),
      variant: TOAST.ERROR
    });

    if (delay) {
      this.delayAndRemove(delay);
    }
  }

  getErrorMessage({ detail, data }: Error): string {
    if (detail) {
      return detail;
    }

    if (data) {
      return `You ${data.label} is wrong`;
    }
  }

  isErrorToast(toast: Toast) {
    if (toast.variant === TOAST.ERROR) {
      return true;
    }
    return false;
  }

  delayAndRemove(milliseconds: number) {
    setTimeout(() => {
      this.toasts.pop();
    }, milliseconds);
  }

  remove(index?: number) {
    if (index) {
      this.toasts.splice(index, 1);
    } else {
      this.toasts.pop();
    }
  }
}

interface Toast {
  title: string;
  message: string;
  variant?: TOAST;
  delay?: number;
}

enum TOAST {
  PRIMARY,
  ERROR
}
