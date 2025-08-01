/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { http } from 'msw';

import type { AdminSystemDepartmentsQueryQueryResponse } from '../../models/AdminSystemDepartmentsQuery';

import { createAdminSystemDepartmentsQueryQueryResponseFaker } from '../../mocks/departmentController/createAdminSystemDepartmentsQueryFaker';

export function adminSystemDepartmentsQueryHandler(
  data?: AdminSystemDepartmentsQueryQueryResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Response),
) {
  return http.get('/api/v1/admin_system/department', (info) => {
    if (typeof data === 'function')
      return data(info);

    return new Response(JSON.stringify(data || createAdminSystemDepartmentsQueryQueryResponseFaker(data)), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
}
