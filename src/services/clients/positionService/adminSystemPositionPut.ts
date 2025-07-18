/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { RequestConfig, ResponseErrorConfig } from '@/request/restful/client';

import fetch from '@/request/restful/client';

import type {
  AdminSystemPositionPutMutationRequest,
  AdminSystemPositionPutMutationResponse,
  AdminSystemPositionPutPathParams,
} from '../../models/AdminSystemPositionPut';

import {
  adminSystemPositionPutMutationRequestSchema,
  adminSystemPositionPutMutationResponseSchema,
} from '../../zod/positionController/adminSystemPositionPutSchema';

export function getAdminSystemPositionPutUrl({ id }: { id: AdminSystemPositionPutPathParams['id'] }) {
  return `/api/v1/admin_system/position/${id}` as const;
}

/**
 * @summary 修改职位
 * {@link /api/v1/admin_system/position/:id}
 */
export async function adminSystemPositionPut(
  { id, data }: { id: AdminSystemPositionPutPathParams['id']; data?: AdminSystemPositionPutMutationRequest },
  config: Partial<RequestConfig<AdminSystemPositionPutMutationRequest>> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config;

  const requestData = adminSystemPositionPutMutationRequestSchema.parse(data);
  const res = await request<AdminSystemPositionPutMutationResponse, ResponseErrorConfig<Error>, AdminSystemPositionPutMutationRequest>({
    method: 'PUT',
    url: getAdminSystemPositionPutUrl({ id }).toString(),
    data: requestData,
    ...requestConfig,
  });
  return { ...res, data: adminSystemPositionPutMutationResponseSchema.parse(res.data) };
}
