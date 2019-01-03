import { State, StateContext, Action } from '@ngxs/store';

import { ErrorModel } from './error.model';

export class SetErrors {
  static readonly type = '[Error] Set';
  constructor(public errors: ErrorModel[]) {}
}

export class ResetErrors {
  static readonly type = '[Error] Reset';
}

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
