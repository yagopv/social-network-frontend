import { Component } from '@angular/core';

@Component({
  selector: 'hab-welcome-forms',
  templateUrl: './welcome-forms.component.html',
  styleUrls: ['./welcome-forms.component.scss']
})
export class WelcomeFormsComponent {
  isRegisterFormVisible = true;

  toggleForm() {
    this.isRegisterFormVisible = !this.isRegisterFormVisible;
  }
}
