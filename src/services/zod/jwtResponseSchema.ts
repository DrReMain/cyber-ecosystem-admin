/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod/v4';

export const jwtResponseSchema = z.object({
  access_token: z.string().describe('访问令牌'),
  access_expire: z.number().min(0).describe('访问令牌过期时间戳'),
  refresh_token: z.string().describe('刷新令牌'),
  refresh_expire: z.number().min(0).describe('刷新令牌过期时间戳'),
});

export type JwtResponseSchema = z.infer<typeof jwtResponseSchema>;
