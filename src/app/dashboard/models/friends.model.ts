import { Profile } from '../../auth/models/profile.model';
import { FriendRequest } from './friend-request.model';

export interface Friends {
  friends: FriendRequest[];
  userSearch: Profile[];
  requests: FriendRequest[];
}
