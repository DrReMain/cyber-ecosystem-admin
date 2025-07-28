import type { Options as KyOptions } from 'ky';

export function defaultHeaders() {
  const headers: KyOptions['headers'] = {};
  if (process.env.NEXT_PUBLIC_API_CHECK_HEADER) {
    headers[process.env.NEXT_PUBLIC_API_CHECK_HEADER] = process.env.NEXT_PUBLIC_API_CHECK_VALUE;
  }
  return headers;
}

export default defaultHeaders;
