import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'sn-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm.valueChanges.subscribe({
      next: value => console.log(value)
    });
  }

  submitForm() {
    if (this.profileForm.valid) {
      console.log('Submitted');
    }
  }
}
