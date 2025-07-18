import { JwtType } from '../../common/constants';
import { z } from 'zod/v3';

export const JwtPayloadBaseSchema = z.object({
  iss: z.string().optional(),
  sub: z.string().optional(),
  aud: z.string().array().optional(),
  exp: z.number().optional(),
  nbf: z.number().optional(),
  iat: z.number().optional(),
  jti: z.string().optional(),
});

export const JwtWithTypeSchema = z.object({
  jwtType: z.nativeEnum(JwtType),
});

export const JwtUserInputSchema = z.object({
  type: z.literal('user'),
  userId: z.string(),
  sessionId: z.string(),
  phone: z.string(),
});

export const JwtMemberInputSchema = z.object({
  type: z.literal('member'),
  userId: z.string(),
  orgId: z.string(),
  memberId: z.string(),
  permissions: z.string().array().optional(),
  sessionId: z.string(),
});

export const JwtAdminInputSchema = z.object({
  type: z.literal('admin'),
  userId: z.string(),
  permissions: z.string().array().optional(),
  sessionId: z.string(),
});

export const JwtUserSchema =
  JwtUserInputSchema.merge(JwtPayloadBaseSchema).merge(JwtWithTypeSchema);

export const JwtMemberSchema =
  JwtMemberInputSchema.merge(JwtPayloadBaseSchema).merge(JwtWithTypeSchema);

export const JwtAdminSchema =
  JwtAdminInputSchema.merge(JwtPayloadBaseSchema).merge(JwtWithTypeSchema);

export const JwtPayloadInputSchema = z.union([
  JwtUserInputSchema.merge(JwtWithTypeSchema),
  JwtMemberInputSchema.merge(JwtWithTypeSchema),
  JwtAdminInputSchema.merge(JwtWithTypeSchema),
]);

export const JwtPayloadSchema = z.union([
  JwtUserSchema,
  JwtMemberSchema,
  JwtAdminSchema,
]);
