import { Friend } from '../../core/models/friend.model';
import { Profile } from '../../modules/auth/models/profile.model';

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

export class GetFriends {
  static readonly type = '[Friend] GetFriends';
}
export class GetFriendsSuccess {
  static readonly type = '[Friend] GetFriendsSuccess';
  constructor(public friends: Friend[]) {}
}
export class GetFriendsFailed {
  static readonly type = '[Friend] GetFriendsFailed';
  constructor(public errors: Error[]) {}
}

export class GetFriendRequests {
  static readonly type = '[Friend] GetFriendRequests';
  constructor() {}
}
export class GetFriendRequestsSuccess {
  static readonly type = '[Friend] GetFriendRequestsSuccess';
  constructor(public requests: Friend[]) {}
}
export class GetFriendRequestFailed {
  static readonly type = '[Friend] GetFriendRequestFailed';
  constructor(public errors: Error[]) {}
}

export class AcceptFriendRequests {
  static readonly type = '[Friend] AcceptFriendRequests';
  constructor(public uuid: string) {}
}
export class AcceptFriendRequestsSuccess {
  static readonly type = '[Friend] AcceptFriendRequestsSuccess';
  constructor(public uuid: string) {}
}
export class AcceptFriendRequestFailed {
  static readonly type = '[Friend] AcceptFriendRequestFailed';
  constructor(public errors: Error[]) {}
}

export class AddFriend {
  static readonly type = '[Friend] AddFriend';
  constructor(public friend: string) {}
}
export class AddFriendSuccess {
  static readonly type = '[Friend] AddFriendSuccess';
}
export class AddFriendFailed {
  static readonly type = '[Friend] AddFriendFailed';
  constructor(public errors: Error[]) {}
}
