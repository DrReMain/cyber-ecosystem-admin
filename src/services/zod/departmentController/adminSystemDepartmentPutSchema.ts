/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod/v4';

import { commonResSchema } from '../commonResSchema';

export const adminSystemDepartmentPutPathParamsSchema = z.object({
  id: z.string().min(20).max(20),
});

export type AdminSystemDepartmentPutPathParamsSchema = z.infer<typeof adminSystemDepartmentPutPathParamsSchema>;

/**
 * @description 非查询返回
 */
export const adminSystemDepartmentPut200Schema = commonResSchema.and(
  z.object({
    result: z.string(),
  }),
);

export type AdminSystemDepartmentPut200Schema = z.infer<typeof adminSystemDepartmentPut200Schema>;

export const adminSystemDepartmentPutMutationRequestSchema = z.object({
  sort: z.int().min(0).optional(),
  department_name: z.string().max(255).optional(),
  remark: z.string().max(255).optional(),
  parent_id: z.string().min(20).max(20).optional(),
});

export type AdminSystemDepartmentPutMutationRequestSchema = z.infer<typeof adminSystemDepartmentPutMutationRequestSchema>;

export const adminSystemDepartmentPutMutationResponseSchema = adminSystemDepartmentPut200Schema;

export type AdminSystemDepartmentPutMutationResponseSchema = z.infer<typeof adminSystemDepartmentPutMutationResponseSchema>;
