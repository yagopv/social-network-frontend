export interface FriendRequest {
  uuid: string;
  avatarUrl: string;
  fullName: string;
  request: Request;
}

interface Request {
  uuid: string;
  confirmed: boolean;
  createdAt: number;
  confirmedAt: number;
  rejectedAt: number;
}
