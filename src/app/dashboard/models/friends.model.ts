import { Profile } from '../../auth/models/profile.model';

export interface Friends {
  friends: Profile[];
  userSearch: Profile[];
}
