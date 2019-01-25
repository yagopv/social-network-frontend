export interface Profile {
  uuid: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  preferences: Preferences;
}

export interface Preferences {
  isPublicProfile: boolean;
  linkedIn: string;
  twitter: string;
  github: string;
}
