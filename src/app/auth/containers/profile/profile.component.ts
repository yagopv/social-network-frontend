import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ErrorState } from '../../../error/store/error.state';
import { Observable } from 'rxjs';
import { ErrorModel } from '../../../error/error.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hab-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Select(ErrorState) errors$: Observable<ErrorModel>;

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
