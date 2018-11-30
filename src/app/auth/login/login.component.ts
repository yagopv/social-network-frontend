import { Component } from '@angular/core';
import { NgForm, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'hab-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginModel = {};
  constructor(private router: Router) {}

  login(form: NgForm) {
    if (!form.valid) {
      this.markControlsAsTouched(form.controls);
      return;
    }

    // TODO: Login user
    console.log('login() - ', form.value);
    this.router.navigate(['/dashboard']);
  }

  private markControlsAsTouched(controls: { [key: string]: AbstractControl }) {
    Object.values(controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
