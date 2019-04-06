export interface LoginResponse {
  uuid: string;
  email: string;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
}
