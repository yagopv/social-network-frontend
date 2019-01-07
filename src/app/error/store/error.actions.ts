import { ErrorModel } from '../error.model';

export class SetErrors {
  static readonly type = '[Error] Set';
  constructor(public errors: ErrorModel[]) {}
}

export class ResetErrors {
  static readonly type = '[Error] Reset';
}
