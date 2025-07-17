import type { KyInstance } from 'ky';

import ky from 'ky';

import { defaultHeaders } from '@/request/restful/default-headers';

export const kyInstance: KyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || '/',
  retry: 0,
  timeout: 30000,
  headers: defaultHeaders(),
  hooks: {
    beforeRequest: [
      (request) => {
        if (process.env.NODE_ENV === 'development')
          console.log(`[KyReq]: ${request.method} ${request.url}`); // eslint-disable-line no-console
      },
    ],
    afterResponse: [
      (request, _options, response) => {
        if (process.env.NODE_ENV === 'development')
          console.log(`[KyRes]: ${response.status} ${request.url}`); // eslint-disable-line no-console
      },
    ],
  },
});

export default kyInstance;
