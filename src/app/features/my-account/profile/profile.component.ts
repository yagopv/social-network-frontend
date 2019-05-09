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

  constructor(private fb: FormBuilder, private userStore: UserService) {}

  ngOnInit() {
    this.userStore.state$.subscribe(({ fullName, preferences }) =>
      this.updateProfileForm.setValue({
        fullName: fullName || '',
        preferences: {
          isPublicProfile: false,
          linkedIn: '',
          twitter: '',
          github: '',
          description: '',
          ...preferences
        }
      })
    );
  }

  updateProfile() {
    if (!this.updateProfileForm.valid) {
      this.markFormGroupTouched(this.updateProfileForm);
      return;
    }

    this.userStore.updateUserProfile(this.updateProfileForm.value).subscribe();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
