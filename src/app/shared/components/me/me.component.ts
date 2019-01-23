import { Component, OnInit, Input } from '@angular/core';
import { InvokeFunctionExpr } from '@angular/compiler';
import { AuthStateModel } from '../../../auth/store/auth.state';

@Component({
  selector: 'hab-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent {
  @Input() user: AuthStateModel;
}
