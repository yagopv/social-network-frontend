import { Preferences } from '../../auth/models/profile.model';

export interface Friend {
  uuid: string;
  avatarUrl: string;
  fullName: string;
  isMyFriend: boolean;
  request: FriendRequest;
  preferences: Preferences;
}

export interface FriendRequest {
  uuid: string;
  confirmed: boolean;
  createdAt: Date;
  confirmedAt: Date;
  rejectedAt: Date;
}
