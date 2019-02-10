import { Profile } from '../../auth/models/profile.model';
import { Friend } from './friend.model';

export interface Friends {
  friends: { [key: string]: Friend };
  userSearch: { [key: string]: Profile };
  requests: { [key: string]: Friend };
}
