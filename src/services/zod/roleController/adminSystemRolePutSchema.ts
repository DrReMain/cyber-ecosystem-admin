/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod/v4';

import { commonResSchema } from '../commonResSchema';

export const adminSystemRolePutPathParamsSchema = z.object({
  id: z.string().min(20).max(20),
});

export type AdminSystemRolePutPathParamsSchema = z.infer<typeof adminSystemRolePutPathParamsSchema>;

/**
 * @description 非查询返回
 */
export const adminSystemRolePut200Schema = commonResSchema.and(
  z.object({
    result: z.string(),
  }),
);

export type AdminSystemRolePut200Schema = z.infer<typeof adminSystemRolePut200Schema>;

export const adminSystemRolePutMutationRequestSchema = z.object({
  sort: z.int().min(0).optional(),
  role_name: z.string().max(255).optional(),
  code: z.string().max(255).optional(),
  remark: z.string().max(255).optional(),
  menu_ids: z.array(z.string()).optional(),
});

export type AdminSystemRolePutMutationRequestSchema = z.infer<typeof adminSystemRolePutMutationRequestSchema>;

export const adminSystemRolePutMutationResponseSchema = adminSystemRolePut200Schema;

export type AdminSystemRolePutMutationResponseSchema = z.infer<typeof adminSystemRolePutMutationResponseSchema>;
