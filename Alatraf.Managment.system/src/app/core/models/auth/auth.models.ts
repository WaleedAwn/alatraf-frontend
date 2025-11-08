export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  expiredAccessToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresOnUtc: string; 
}

export interface AppUser {
  userId: string;
  email: string;
  roles: string[];
  claims: Claim[];
}

export interface Claim {
  type: string;
  value: string;
}
