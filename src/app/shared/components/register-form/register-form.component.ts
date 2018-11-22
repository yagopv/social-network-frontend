import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MailValidator } from 'app/shared/validators/mail.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'hab-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, MailValidator]]
  });

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm.valueChanges.subscribe(value => console.log(value));
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      // TODO: Register user
      console.log('register() - ', formData);
      this.router.navigate(['/dashboard']);
    }
  }
}
