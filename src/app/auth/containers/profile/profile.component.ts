import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ErrorState } from '../../../error/store/error.state';
import { Error } from '../../../error/models/error.model';

@Component({
  selector: 'hab-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Select(ErrorState) errors$: Observable<Error>;

  updateProfileForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      preferences: this.fb.group({
        isPublicProfile: [false],
        linkedIn: [''],
        twitter: [''],
        github: ['']
      })
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store) {}

  updateProfile() {
    const { email, password, fullName } = this.updateProfileForm.value;
    // this.store.dispatch(new Register({ email, password, fullName }));
  }
}
