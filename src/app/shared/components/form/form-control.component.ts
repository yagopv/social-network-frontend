import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sn-form-control',
  template: `
    <div
      class="form-control"
      [class.has-error]="
        (control.errors && (control.dirty || control.touched)) ||
        (group?.errors && (group?.dirty || group?.touched))
      "
    >
      <ng-content></ng-content>

      <ng-container
        *ngIf="control.invalid && (control.dirty || control.touched)"
      >
        <p class="error-message" *ngIf="control.hasError('required')">
          <fa-icon [icon]="errorIcon"> </fa-icon> This field is mandatory
        </p>
        <p class="error-message" *ngIf="control.hasError('minlength')">
          <fa-icon [icon]="errorIcon"> </fa-icon> The length is invalid
        </p>
        <p class="error-message" *ngIf="control.hasError('malformedMail')">
          <fa-icon [icon]="errorIcon"> </fa-icon> The Email is not valid
        </p>
        <p class="error-message" *ngIf="control.hasError('malformedUrl')">
          <fa-icon [icon]="errorIcon"> </fa-icon> The URL is not valid
        </p>
        <p class="error-message" *ngIf="control.hasError('emailExists')">
          <fa-icon [icon]="errorIcon"> </fa-icon> The email already is taken
        </p>
      </ng-container>
      <ng-container *ngIf="group?.invalid && (group?.dirty || group?.touched)">
        <p
          class="error-message"
          *ngIf="control.valid && group.hasError('passwordMismatch')"
        >
          <fa-icon [icon]="errorIcon"></fa-icon>
          Password and confirmation not matching
        </p>
      </ng-container>
    </div>
  `
})
export class FormControlComponent {
  @Input() group?: FormGroup;
  @Input() control: AbstractControl;
  errorIcon: IconProp = faExclamationTriangle;
}
