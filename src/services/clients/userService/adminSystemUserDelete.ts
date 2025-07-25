/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { RequestConfig, ResponseErrorConfig } from '@/request/restful/client';

import fetch from '@/request/restful/client';

import type {
  AdminSystemUserDeleteMutationRequest,
  AdminSystemUserDeleteMutationResponse,
  AdminSystemUserDeletePathParams,
} from '../../models/AdminSystemUserDelete';

import { adminSystemUserDeleteMutationRequestSchema, adminSystemUserDeleteMutationResponseSchema } from '../../zod/userController/adminSystemUserDeleteSchema';

export function getAdminSystemUserDeleteUrl({ id }: { id: AdminSystemUserDeletePathParams['id'] }) {
  return `/api/v1/admin_system/user/${id}` as const;
}

/**
 * @summary 删除单个用户
 * {@link /api/v1/admin_system/user/:id}
 */
export async function adminSystemUserDelete(
  { id, data }: { id: AdminSystemUserDeletePathParams['id']; data?: AdminSystemUserDeleteMutationRequest },
  config: Partial<RequestConfig<AdminSystemUserDeleteMutationRequest>> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config;

  const requestData = adminSystemUserDeleteMutationRequestSchema.parse(data);
  const res = await request<AdminSystemUserDeleteMutationResponse, ResponseErrorConfig<Error>, AdminSystemUserDeleteMutationRequest>({
    method: 'DELETE',
    url: getAdminSystemUserDeleteUrl({ id }).toString(),
    data: requestData,
    ...requestConfig,
  });
  return { ...res, data: adminSystemUserDeleteMutationResponseSchema.parse(res.data) };
}
