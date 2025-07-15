import type { KyInstance, Options as KyOptions } from 'ky';

import ky from 'ky';

export interface RequestConfig<TData = unknown> {
  baseURL?: string;
  url?: string;
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';
  params?: unknown;
  data?: TData | FormData;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  signal?: AbortSignal;
  headers?: KyOptions['headers'];
}

export interface ResponseConfig<TData = unknown> {
  data: TData;
  status: number;
  statusText: string;
  headers?: KyOptions['headers'];
}

export type ResponseErrorConfig<TError = unknown> = TError;

/**
 * Custom error class for wrapping HTTP request errors
 * @template TError Type of the error data
 */
export class KyError<TError = unknown> extends Error {
  public response?: {
    data: TError;
    status: number;
    statusText: string;
    headers?: KyOptions['headers'];
  };

  constructor(
    message: string,
    public request?: Request,
    response?: Response,
    responseData?: TError,
  ) {
    super(message);
    this.name = 'KyError';

    if (response) {
      this.response = {
        data: responseData as TError,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()) as KyOptions['headers'] || undefined,
      };
    }
  }
}

export class BizError<TData = unknown> {
  public name = 'BizError';
  public response?: {
    data: TData;
    status: number;
    statusText: string;
    headers?: KyOptions['headers'];
  };

  constructor(response?: Response, responseData?: TData) {
    if (response) {
      this.response = {
        data: responseData as TData,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()) as KyOptions['headers'] || undefined,
      };
    }
  }
}

/**
 * Convert parameter object to URLSearchParams
 * @param params Parameter object
 * @returns URLSearchParams instance
 */
function convertParamsToSearchParams(params: unknown): URLSearchParams | undefined {
  if (!params || typeof params !== 'object')
    return undefined;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      }
      else {
        searchParams.append(key, String(value));
      }
    }
  }
  return searchParams;
}

/**
 * Handle response data based on response type
 * @param response Response object
 * @param responseType Response type
 * @returns Processed response data
 */
async function handleResponse<TData>(
  response: Response,
  responseType: RequestConfig['responseType'] = 'json',
): Promise<TData> {
  const handlers = {
    arraybuffer: () => response.arrayBuffer(),
    blob: () => response.blob(),
    text: () => response.text(),
    json: () => response.headers.get('content-type')?.includes('application/json')
      ? response.json()
      : response.text(),
  };

  return (handlers[responseType as keyof typeof handlers] || handlers.json)();
}

/**
 * Extract headers from the response object
 * @param response Response object
 * @returns Extracted headers or undefined
 */
function extractHeaders(response: Response): KyOptions['headers'] | undefined {
  const headers = Object.fromEntries(response.headers.entries());
  return Object.keys(headers).length > 0 ? headers as KyOptions['headers'] : undefined;
}

/**
 * Parse error response data
 * @param response Response object
 * @returns Parsed error data or undefined
 */
async function parseErrorResponse<TError>(response: Response): Promise<TError | undefined> {
  try {
    return await response.clone().json();
  }
  catch {
    try {
      return (await response.clone().text()) as TError;
    }
    catch {
      return undefined;
    }
  }
}

export function defaultHeaders() {
  const headers: KyOptions['headers'] = {};
  if (process.env.NEXT_PUBLIC_API_CHECK_HEADER) {
    headers[process.env.NEXT_PUBLIC_API_CHECK_HEADER] = process.env.NEXT_PUBLIC_API_CHECK_VALUE;
  }
  return headers;
}

export const kyInstance: KyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || '/',
  retry: 0,
  timeout: 30000,
  headers: defaultHeaders(),
  hooks: {
    beforeRequest: [(request) => {
      if (process.env.NODE_ENV === 'development')
        console.log(`[KyReq]: ${request.method} ${request.url}`); // eslint-disable-line no-console
    }],
    afterResponse: [(request, _options, response) => {
      if (process.env.NODE_ENV === 'development')
        console.log(`[KyRes]: ${response.status} ${request.url}`); // eslint-disable-line no-console
    }],
  },
});

/**
 * HTTP client core function
 * @template TData Response data type
 * @template TError Error data type
 * @template TVariables Request data type
 * @param config Request configuration
 * @returns Promise<ResponseConfig<TData>> Response configuration object
 */
export async function client<TData, TError = unknown, TVariables = unknown>(config: RequestConfig<TVariables>): Promise<ResponseConfig<TData>> {
  try {
    const { baseURL, url = '', method, params, data, responseType = 'json', signal, headers = {} } = config;

    const requestUrl = (baseURL && !url.startsWith('http'))
      ? `${baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
      : url.replace(/^\//, '');

    const kyOptions: KyOptions = { method: method.toLowerCase(), signal, headers: { ...headers } };

    if (params && (method === 'GET' || method === 'DELETE'))
      kyOptions.searchParams = convertParamsToSearchParams(params);

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      if (data instanceof FormData)
        kyOptions.body = data;
      else
        kyOptions.json = data;
    }

    const response = await kyInstance(requestUrl, kyOptions);

    const responseData = await handleResponse<TData>(response, responseType);

    if (responseData && typeof responseData === 'object' && 'success' in responseData && !responseData.success)
      throw new BizError<TData>(response, responseData);

    return {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
      headers: extractHeaders(response),
    };
  }
  catch (error) {
    if (error instanceof Error) {
      let responseData: TError | undefined;
      let response: Response | undefined;

      if ('response' in error && error.response instanceof Response) {
        response = error.response;

        if ('responseData' in error)
          responseData = error.responseData as TError;
        else
          responseData = await parseErrorResponse<TError>(response);
      }

      throw new KyError<TError>(error.message, undefined, response, responseData);
    }

    throw error;
  }
}

export default client;
