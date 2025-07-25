/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod/v4';

import { commonResSchema } from '../commonResSchema';
import { userResSchema } from '../userResSchema';

export const adminSystemUserGetPathParamsSchema = z.object({
  id: z.string().min(20).max(20),
});

export type AdminSystemUserGetPathParamsSchema = z.infer<typeof adminSystemUserGetPathParamsSchema>;

/**
 * @description success
 */
export const adminSystemUserGet200Schema = commonResSchema.and(
  z.object({
    get result() {
      return userResSchema;
    },
  }),
);

export type AdminSystemUserGet200Schema = z.infer<typeof adminSystemUserGet200Schema>;

export const adminSystemUserGetQueryResponseSchema = adminSystemUserGet200Schema;

export type AdminSystemUserGetQueryResponseSchema = z.infer<typeof adminSystemUserGetQueryResponseSchema>;
