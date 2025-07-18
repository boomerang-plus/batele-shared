import { JwtType } from '../constants/jwt-type.enum';

export interface JwtPayloadBase {
  iss?: string;
  sub?: string;
  aud?: string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export interface JwtWithType {
  jwtType: JwtType;
}

export interface JwtUserInput {
  type: 'user';
  userId: string;
  sessionId: string;
  phone: string;
}

export interface JwtMemberInput {
  type: 'member';
  userId: string;
  orgId: string;
  memberId: string;
  permissions?: string[];
  sessionId: string;
}

export interface JwtAdminInput {
  type: 'admin';
  userId: string;
  permissions?: string[];
  sessionId: string;
}

export type JwtPayloadInput = JwtUserInput | JwtMemberInput | JwtAdminInput;

export type JwtUser = JwtPayloadBase & JwtUserInput & JwtWithType;

export type JwtMember = JwtPayloadBase & JwtMemberInput & JwtWithType;
export type JwtAdmin = JwtPayloadBase & JwtAdminInput & JwtWithType;

export type JwtPayload = JwtUser | JwtMember | JwtAdmin;
