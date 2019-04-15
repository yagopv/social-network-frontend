import { Request } from '../../core/core.models';

export interface FriendRequest {
  uuid: string;
  avatarUrl: string;
  fullName: string;
  request: Request;
}
