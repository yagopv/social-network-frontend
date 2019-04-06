import { Preferences } from '../../modules/auth/models/profile.model';

export interface Friend {
  uuid: string;
  avatarUrl: string;
  fullName: string;
  request: FriendRequest;
  preferences: Preferences;
}

export interface FriendRequest {
  uuid: string;
  confirmed: boolean;
  createdAt: number;
  confirmedAt: number;
  rejectedAt: number;
}
