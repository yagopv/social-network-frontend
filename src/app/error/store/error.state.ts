import { State, StateContext, Action } from '@ngxs/store';

import { Error } from '../models/error.model';
import { SetErrors, ResetErrors } from './error.actions';

@State<Error[]>({
  name: 'errors',
  defaults: []
})
export class ErrorState {
  constructor() {}

  @Action(SetErrors)
  setErrors({ setState }: StateContext<Error[]>, { errors }: SetErrors) {
    setState(errors);
  }

  @Action(ResetErrors)
  resetErrors({ setState }: StateContext<Error[]>) {
    setState([]);
  }
}
