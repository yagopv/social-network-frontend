import { State, StateContext, Action } from '@ngxs/store';

import { ErrorModel } from '../error.model';
import { SetErrors, ResetErrors } from './error.actions';

@State<ErrorModel[]>({
  name: 'errors',
  defaults: []
})
export class ErrorState {
  constructor() {}

  @Action(SetErrors)
  setErrors({ setState }: StateContext<ErrorModel[]>, { errors }: SetErrors) {
    setState(errors);
  }

  @Action(ResetErrors)
  resetErrors({ setState }: StateContext<ErrorModel[]>) {
    setState([]);
  }
}
