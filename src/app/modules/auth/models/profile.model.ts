export interface Profile {
  uuid: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  preferences: Preferences;
  friends: Friend[];
}

export interface Preferences {
  isPublicProfile: boolean;
  linkedIn?: string;
  twitter?: string;
  github?: string;
  description?: string;
}

export interface Friend {
  uuid: string;
  confirmed: boolean;
  createdAt: number;
  confirmedAt: number;
  rejectedAt: number;
}
