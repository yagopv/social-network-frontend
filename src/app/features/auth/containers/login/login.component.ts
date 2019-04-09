import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';

import { Login, LoginFailed } from '../../store/auth.actions';
import { MailValidator } from '../../../../shared/validators/mail.validator';
import { AuthService } from '../../../../core/http/auth.service';
import { UserStore } from '../../../../core/store/user.store';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );
  constructor(
    private fb: FormBuilder,
    private actions$: Actions,
    private store: Store,
    private userStore: UserStore
  ) {
    // Sample observable showing values
    this.loginForm.valueChanges.subscribe(value => console.log(value));
  }

  ngOnInit() {
    this.actions$.pipe(ofAction(LoginFailed)).subscribe(() => {
      this.loginForm.get('password').reset();
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.userStore.login(this.loginForm.value);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { NgForm, AbstractControl } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { Store, Select, Actions, ofAction } from '@ngxs/store';

// import { LoginModel } from './login.model';
// import { ErrorState } from '../../../error/store/error.state';
// import { Login, LoginFailed } from '../../store/auth.actions';
// import { Error } from '../../../error/models/error.model';

// @Component({
//   selector: 'sn-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   @Select(ErrorState) errors$: Observable<Error>;
//   loginModel: LoginModel = new LoginModel();

//   constructor(private actions$: Actions, private store: Store) {}

//   ngOnInit() {
//     this.actions$.pipe(ofAction(LoginFailed)).subscribe(() => {
//       this.loginModel.password = '';
//     });
//   }

//   login(form: NgForm) {
//     if (!form.valid) {
//       this.markControlsAsTouched(form.controls);
//       return;
//     }

//     this.store.dispatch(new Login(form.value));
//   }

//   private markControlsAsTouched(controls: { [key: string]: AbstractControl }) {
//     Object.values(controls).forEach(control => {
//       control.markAsTouched();
//     });
//   }
// }
