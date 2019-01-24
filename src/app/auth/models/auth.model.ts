export interface Auth {
  uuid: string;
  email: string;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
  fullName: string;
  avatarUrl: string;
  preferences: {
    isPublicProfile: string;
    linkedIn: string;
    twitter: string;
    github: string;
  };
}
