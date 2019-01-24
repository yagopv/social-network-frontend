export interface UserProfileResponse {
  fullName: string;
  avatarUrl: string;
  preferences: {
    isPublicProfile: string;
    linkedIn: string;
    twitter: string;
    github: string;
  };
}
