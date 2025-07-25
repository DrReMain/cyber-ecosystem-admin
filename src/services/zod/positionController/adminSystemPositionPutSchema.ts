/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod/v4';

import { commonResSchema } from '../commonResSchema';

export const adminSystemPositionPutPathParamsSchema = z.object({
  id: z.string().min(20).max(20),
});

export type AdminSystemPositionPutPathParamsSchema = z.infer<typeof adminSystemPositionPutPathParamsSchema>;

/**
 * @description 非查询返回
 */
export const adminSystemPositionPut200Schema = commonResSchema.and(
  z.object({
    result: z.string(),
  }),
);

export type AdminSystemPositionPut200Schema = z.infer<typeof adminSystemPositionPut200Schema>;

export const adminSystemPositionPutMutationRequestSchema = z.object({
  sort: z.int().min(0).optional(),
  position_name: z.string().max(255).optional(),
  code: z.string().max(255).optional(),
  remark: z.string().max(255).optional(),
});

export type AdminSystemPositionPutMutationRequestSchema = z.infer<typeof adminSystemPositionPutMutationRequestSchema>;

export const adminSystemPositionPutMutationResponseSchema = adminSystemPositionPut200Schema;

export type AdminSystemPositionPutMutationResponseSchema = z.infer<typeof adminSystemPositionPutMutationResponseSchema>;
