import { Friend } from './friend.model';
import { Profile } from '../../features/auth/models/profile.model';

export interface Friends {
  friends: Friend[];
  userSearch: Profile[];
  requests: Friend[];
}
