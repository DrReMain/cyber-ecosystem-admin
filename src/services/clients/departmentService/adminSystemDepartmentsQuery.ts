/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { RequestConfig, ResponseErrorConfig } from '@/request/restful/client';

import fetch from '@/request/restful/client';

import type { AdminSystemDepartmentsQueryQueryParams, AdminSystemDepartmentsQueryQueryResponse } from '../../models/AdminSystemDepartmentsQuery';

import { adminSystemDepartmentsQueryQueryResponseSchema } from '../../zod/departmentController/adminSystemDepartmentsQuerySchema';

export function getAdminSystemDepartmentsQueryUrl() {
  return `/api/v1/admin_system/department` as const;
}

/**
 * @summary 查询多个部门
 * {@link /api/v1/admin_system/department}
 */
export async function adminSystemDepartmentsQuery(
  { params }: { params?: AdminSystemDepartmentsQueryQueryParams },
  config: Partial<RequestConfig> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config;

  const res = await request<AdminSystemDepartmentsQueryQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getAdminSystemDepartmentsQueryUrl().toString(),
    params,
    ...requestConfig,
  });
  return { ...res, data: adminSystemDepartmentsQueryQueryResponseSchema.parse(res.data) };
}
