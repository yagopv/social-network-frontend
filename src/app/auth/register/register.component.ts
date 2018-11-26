import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MailValidator } from 'app/shared/validators/mail.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'hab-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, MailValidator]]
  });

  ngOnInit() {
    console.log('onInit - RegisterComponent');
  }

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
