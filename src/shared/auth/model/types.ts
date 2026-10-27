export type AuthUser = {
  id: string;
  email: string;
  roles: string[];
};

export type SigninResult = {
  accessToken: string;
  expiresAtUtc: string;
};

export type Session = {
  accessToken: string;
  expiresAt: number;
  user: AuthUser;
};
