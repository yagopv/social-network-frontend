export interface Profile {
  uuid: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  preferences: Preferences;
}

export interface Preferences {
  isPublicProfile: string;
  linkedIn: string;
  twitter: string;
  github: string;
}
