import { Friend } from './friend.model';
import { Profile } from '../../../core/models/user.models';

export interface Friends {
  friends: Friend[];
  userSearch: Profile[];
  requests: Friend[];
}
