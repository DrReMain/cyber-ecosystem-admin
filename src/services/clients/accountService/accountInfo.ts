/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { RequestConfig, ResponseErrorConfig } from '@/request/restful/client';

import fetch from '@/request/restful/client';

import type { AccountInfoQueryResponse } from '../../models/AccountInfo';

import { accountInfoQueryResponseSchema } from '../../zod/accountController/accountInfoSchema';

export function getAccountInfoUrl() {
  return `/api/v1/admin_system/account/info` as const;
}

/**
 * @summary 获取账号信息
 * {@link /api/v1/admin_system/account/info}
 */
export async function accountInfo(config: Partial<RequestConfig> & { client?: typeof fetch } = {}) {
  const { client: request = fetch, ...requestConfig } = config;

  const res = await request<AccountInfoQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getAccountInfoUrl().toString(),
    ...requestConfig,
  });
  return { ...res, data: accountInfoQueryResponseSchema.parse(res.data) };
}
