import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { ErrorState } from '../../../error/store/error.state';
import { Error } from '../../../error/models/error.model';
import { AuthState } from '../../store/auth.state';
import { Profile } from '../../models/profile.model';
import { UrlValidator } from '../../../shared/validators/url.validator';
import { UpdateUserProfile } from '../../store/auth.actions';

@Component({
  selector: 'sn-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Select(ErrorState) errors$: Observable<Error>;
  @Select(AuthState.getUser) user$: Observable<Profile>;

  updateProfileForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      preferences: this.fb.group({
        isPublicProfile: [false],
        linkedIn: ['', [UrlValidator]],
        twitter: ['', [UrlValidator]],
        github: ['', [UrlValidator]]
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
