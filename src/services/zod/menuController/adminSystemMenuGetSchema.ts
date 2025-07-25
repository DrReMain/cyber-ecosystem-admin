/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod/v4';

import { commonResSchema } from '../commonResSchema';
import { menuResSchema } from '../menuResSchema';

export const adminSystemMenuGetPathParamsSchema = z.object({
  id: z.string().min(20).max(20),
});

export type AdminSystemMenuGetPathParamsSchema = z.infer<typeof adminSystemMenuGetPathParamsSchema>;

/**
 * @description success
 */
export const adminSystemMenuGet200Schema = commonResSchema.and(
  z.object({
    get result() {
      return menuResSchema;
    },
  }),
);

export type AdminSystemMenuGet200Schema = z.infer<typeof adminSystemMenuGet200Schema>;

export const adminSystemMenuGetQueryResponseSchema = adminSystemMenuGet200Schema;

export type AdminSystemMenuGetQueryResponseSchema = z.infer<typeof adminSystemMenuGetQueryResponseSchema>;
