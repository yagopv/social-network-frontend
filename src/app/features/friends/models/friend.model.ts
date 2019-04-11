import { Preferences } from '../../../core/models/user.models';

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
