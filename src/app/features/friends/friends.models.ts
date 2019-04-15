import { Preferences, Profile } from '../../core/core.models';

export interface FriendRequest {
  uuid: string;
  avatarUrl: string;
  fullName: string;
  request: Request;
  preferences: Preferences;
}

export interface Request {
  uuid: string;
  confirmed: boolean;
  createdAt: number;
  confirmedAt: number;
  rejectedAt: number;
}
