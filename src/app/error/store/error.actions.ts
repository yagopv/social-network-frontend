import { Error } from '../models/error.model';

export class SetErrors {
  static readonly type = '[Error] Set';
  constructor(public errors: Error[]) {}
}

export class ResetErrors {
  static readonly type = '[Error] Reset';
}
