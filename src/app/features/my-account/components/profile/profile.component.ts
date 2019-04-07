import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { Error } from '../../../../core/models/error.model';
import { UrlValidator } from '../../../../shared/validators/url.validator';
import { AuthState } from '../../../auth/store/auth.state';
import { Profile } from '../../../auth/models/profile.model';
import { UpdateUserProfile } from '../../../auth/store/auth.actions';

@Component({
  selector: 'sn-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @Select(AuthState.getUser) user$: Observable<Profile>;

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

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.user$.subscribe(({ fullName, preferences }) =>
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

    this.store.dispatch(new UpdateUserProfile(this.updateProfileForm.value));
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
