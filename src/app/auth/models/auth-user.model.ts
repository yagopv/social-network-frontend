export interface AuthUserModel {
  uuid: string;
  fullName: string;
  email: string;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
}
