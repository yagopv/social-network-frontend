export interface FriendRequest {
  uuid: string;
  avatarUrl: string;
  fullName: string;
  isFriend: boolean;
  request: {
    _id: string;
    uuid: string;
    confirmed: boolean;
    createdAt: Date;
    confirmedAt: Date;
    rejectedAt: Date;
  };
}
