import { Profile } from '../../auth/models/profile.model';
import { FriendRequest } from './friend-request.model';

export interface Friends {
  friends: { [key: string]: FriendRequest };
  userSearch: { [key: string]: Profile };
  requests: { [key: string]: FriendRequest };
}
