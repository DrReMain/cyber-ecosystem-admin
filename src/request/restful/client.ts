import type { Options as KyOptions } from 'ky';

import kyInstance from '@/request/restful/instance';

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
 * HTTP client core function
 * @template TData Response data type
 * @template TError Error data type
 * @template TVariables Request data type
 * @param config Request configuration
 * @returns Promise<ResponseConfig<TData>> Response configuration object
 */
export async function client<TData, _TError = unknown, TVariables = unknown>(config: RequestConfig<TVariables>): Promise<ResponseConfig<TData>> {
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

  return {
    data: responseData,
    status: response.status,
    statusText: response.statusText,
    headers: extractHeaders(response),
  };
}

export default client;
