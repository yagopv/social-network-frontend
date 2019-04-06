import { Profile } from '../../auth/models/profile.model';
import { Friend } from './friend.model';

export interface Friends {
  friends: Friend[];
  userSearch: Profile[];
  requests: Friend[];
}
