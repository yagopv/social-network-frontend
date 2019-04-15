export interface Auth {
  uuid: string;
  email: string;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
  fullName: string;
  avatarUrl: string;
  preferences: Preferences;
}

export interface UserProfileResponse {
  fullName: string;
  avatarUrl: string;
  preferences: Preferences;
}

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

export interface AuthTokens {
  refreshToken: string;
  accessToken: string;
}

export interface Error {
  id: string;
  links: any;
  status: string;
  code: string;
  title: string;
  detail: string;
  source: {
    pointer: string;
    parameter: string;
  };
  meta: any;
  data: ErrorData;
}

export interface ErrorData {
  pattern: any;
  value: string;
  key: string;
  label: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  uuid: string;
  email: string;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}
