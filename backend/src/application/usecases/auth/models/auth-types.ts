export interface UserPayload {
  sub: string;
  email: string;
  username: string;
}

export interface JwtToken {
  access_token: string;
}

export interface UserFromJwtPayload {
  id: string;
  email: string;
  username: string;
}
