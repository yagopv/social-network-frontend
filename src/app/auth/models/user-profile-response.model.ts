import { Preferences } from './profile.model';

export interface UserProfileResponse {
  fullName: string;
  avatarUrl: string;
  preferences: Preferences;
}
