/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { http } from 'msw';

import type { AdminSystemMenusQueryQueryResponse } from '../../models/AdminSystemMenusQuery';

import { createAdminSystemMenusQueryQueryResponseFaker } from '../../mocks/menuController/createAdminSystemMenusQueryFaker';

export function adminSystemMenusQueryHandler(data?: AdminSystemMenusQueryQueryResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Response)) {
  return http.get('/api/v1/admin_system/menu', (info) => {
    if (typeof data === 'function')
      return data(info);

    return new Response(JSON.stringify(data || createAdminSystemMenusQueryQueryResponseFaker(data)), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
}
