export interface AuthTokens {
  refreshToken: string;
  accessToken: string;
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
