import { Profile } from '../../auth/models/profile.model';
import { Error } from '../../error/models/error.model';

export class SearchUsers {
  static readonly type = '[Friend] SearchUsers';
  constructor(public searchTerm: string) {}
}
export class SearchUsersSuccess {
  static readonly type = '[Friend] SearchUsersSuccess';
  constructor(public users: Profile[]) {}
}
export class SearchUsersFailed {
  static readonly type = '[Friend] SearchUsersFailed';
  constructor(public errors: Error[]) {}
}

export class GetFriendRequests {
  static readonly type = '[Friend] GetFriendRequests';
  constructor() {}
}
export class GetFriendRequestsSuccess {
  static readonly type = '[Friend] GetFriendRequestsSuccess';
  constructor(public friendsRequests: any[]) {}
}
export class GetFriendRequestFailed {
  static readonly type = '[Friend] GetFriendRequestFailed';
  constructor(public errors: Error[]) {}
}
