export interface LoginResponse {
  uuid: string;
  email: string;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
}

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
