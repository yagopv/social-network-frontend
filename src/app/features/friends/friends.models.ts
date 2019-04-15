import { Preferences, Request } from '../../core/core.models';

export interface Friend {
  uuid: string;
  avatarUrl: string;
  fullName: string;
  request: Request;
  preferences: Preferences;
}
