import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { UrlValidator } from '../../../shared/validators/url.validator';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'sn-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  updateProfileForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      preferences: this.fb.group({
        isPublicProfile: [false],
        linkedIn: ['', [UrlValidator]],
        twitter: ['', [UrlValidator]],
        github: ['', [UrlValidator]],
        description: ['']
      })
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.updateProfileForm.setValue({
      fullName: this.userService.currentUser.fullName || '',
      preferences: {
        isPublicProfile: false,
        linkedIn: '',
        twitter: '',
        github: '',
        description: '',
        ...this.userService.currentUser.preferences
      }
    });
  }

  updateProfile() {
    if (!this.updateProfileForm.valid) {
      this.markFormGroupTouched(this.updateProfileForm);
      return;
    }

    this.userService
      .updateUserProfile(this.updateProfileForm.value)
      .subscribe();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
