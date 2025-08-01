/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod/v4';

import { commonResSchema } from '../commonResSchema';

/**
 * @description 非查询返回
 */
export const adminSystemDepartmentPost200Schema = commonResSchema.and(
  z.object({
    result: z.string(),
  }),
);

export type AdminSystemDepartmentPost200Schema = z.infer<typeof adminSystemDepartmentPost200Schema>;

export const adminSystemDepartmentPostMutationRequestSchema = z.object({
  sort: z.int().min(0).optional(),
  department_name: z.string().max(255),
  remark: z.string().max(255).optional(),
  parent_id: z.string().min(20).max(20).optional(),
});

export type AdminSystemDepartmentPostMutationRequestSchema = z.infer<typeof adminSystemDepartmentPostMutationRequestSchema>;

export const adminSystemDepartmentPostMutationResponseSchema = adminSystemDepartmentPost200Schema;

export type AdminSystemDepartmentPostMutationResponseSchema = z.infer<typeof adminSystemDepartmentPostMutationResponseSchema>;
