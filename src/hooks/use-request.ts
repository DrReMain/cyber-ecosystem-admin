import { useAtomValue } from 'jotai';
import { HTTPError, TimeoutError } from 'ky';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { ZodError } from 'zod/v4';

import { user_tokenAtom } from '@/store/user/store';

// ============================================================================
// Types
// ============================================================================

interface ToastOptions<Res> {
  loading?: boolean | string;
  success?: boolean | ((res: Res) => string);
  error?: boolean | ((err: any) => string);
}

interface NormalizedToastOptions<Res> {
  loading?: string;
  success?: (res: Res) => string;
  error?: (err: any) => string;
}

interface TOpts<Res> {
  toast?: boolean | ToastOptions<Res>;
  format?: Record<string, string>;
}

type ConfigOnlyFunction<Config, Res> = (config?: Config) => Promise<Res>;
type ArgsFunction<Args, Config, Res> = (args: Args, config?: Config) => Promise<Res>;
type ApiFunction = ConfigOnlyFunction<any, any> | ArgsFunction<any, any, any>;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Parse error response from HTTP response object
 */
async function parseErrorResponse(response: Response) {
  try {
    return response.clone().json();
  }
  catch {
    return undefined;
  }
}

interface DefaultToastMessages {
  loading: string;
  success: string;
  error: string;
}

/**
 * Normalize toast options based on configuration rules:
 * - true: enable with default logic
 * - false/undefined: disable completely
 * - explicit config: use configured logic
 */
function normalizeToastOptions<Res>(
  toastInput: TOpts<Res>['toast'],
  defaults: DefaultToastMessages,
): NormalizedToastOptions<Res> | null {
  // Enable all default toast functionality
  if (toastInput === true) {
    return {
      loading: defaults.loading,
      success: () => defaults.success,
      error: e => (e instanceof Error ? e.message : defaults.error),
    };
  }

  // Disable toast completely for false/undefined/null
  if (!toastInput) {
    return null;
  }

  const result: NormalizedToastOptions<Res> = {};

  // Handle loading configuration
  if ('loading' in toastInput) {
    if (toastInput.loading === true) {
      result.loading = defaults.loading;
    }
    else if (typeof toastInput.loading === 'string') {
      result.loading = toastInput.loading;
    }
  }

  // Handle success configuration
  if ('success' in toastInput) {
    if (toastInput.success === true) {
      result.success = () => defaults.success;
    }
    else if (typeof toastInput.success === 'function') {
      result.success = toastInput.success;
    }
  }

  // Handle error configuration
  if ('error' in toastInput) {
    if (toastInput.error === true) {
      result.error = e => (e instanceof Error ? e.message : defaults.error);
    }
    else if (typeof toastInput.error === 'function') {
      result.error = toastInput.error;
    }
  }

  // Return null if no functionality is enabled
  if (!result.loading && !result.success && !result.error) {
    return null;
  }

  return result;
}

// ============================================================================
// Main Hook
// ============================================================================

/**
 * Custom hook for handling API requests with automatic header injection,
 * error handling, and toast notifications
 */
export default function useRequest() {
  const t = useTranslations('app');
  const token = useAtomValue(user_tokenAtom);

  /**
   * Inject authorization headers into request config
   */
  function injectHeaders<Config extends Record<string, any> | undefined>(config?: Config): Config extends undefined ? { headers: Record<string, string> } : Config {
    return {
      ...(config || {}),
      headers: {
        ...(token?.access_token ? { Authorization: `Bearer ${token.access_token}` } : {}),
        ...(config?.headers ?? {}),
      },
    } as any;
  }

  /**
   * Handle response processing (currently pass-through)
   */
  function handleResponse<Res>(res: Res, _opts?: TOpts<Res>): Res {
    return res;
  }

  /**
   * Handle and normalize various error types
   */
  async function handleError(e: any, opts?: TOpts<any>): Promise<never> {
    if (e instanceof ZodError) {
      if (e.issues.length > 0) {
        throw new Error(
          t('error.zodField', { fields: e.issues.map(({ path }) => {
            const p = path.join('.');
            return opts?.format?.[p] ?? p;
          }).join(', ') }),
        );
      }
      throw new Error(t('error.zod'));
    }
    else if (e instanceof HTTPError) {
      const parsed = await parseErrorResponse(e.response);
      const msg = parsed?.msg || t('error.http');
      throw new Error(msg);
    }
    else if (e instanceof TimeoutError) {
      // eslint-disable-next-line unicorn/prefer-type-error
      throw new Error(t('error.timeout'));
    }
    else if (e.name === 'AbortError') {
      throw new Error(t('error.abort'));
    }
    else {
      throw new Error(t('error.unknown'));
    }
  }

  /**
   * Apply toast notifications to promise based on normalized options
   */
  function applyToast<Res>(
    promise: Promise<Res>,
    toastOpts: TOpts<Res>['toast'],
  ): Promise<Res> {
    const defaults: DefaultToastMessages = {
      loading: t('request_toast.loading'),
      success: t('request_toast.success'),
      error: t('request_toast.error'),
    };

    const normalized = normalizeToastOptions(toastOpts, defaults);
    if (!normalized) {
      return promise;
    }

    const toastPromiseOptions: any = {};
    if (normalized.loading) {
      toastPromiseOptions.loading = normalized.loading;
    }
    if (normalized.success) {
      toastPromiseOptions.success = normalized.success;
    }
    if (normalized.error) {
      toastPromiseOptions.error = normalized.error;
    }

    return toast.promise(promise, toastPromiseOptions);
  }

  return {
    /**
     * Higher-order function for mutation operations with improved type handling
     */
    mutateHOF: function mutateHOF<Fn extends ApiFunction>(
      fn: Fn,
      opts?: TOpts<Awaited<ReturnType<Fn>>>,
    ) {
      if (fn.length === 0) {
        return (config?: Parameters<Fn>[0]) => {
          return async (): Promise<Awaited<ReturnType<Fn>>> => {
            const basePromise = (fn as any)(injectHeaders(config))
              .then((res: any) => handleResponse(res, opts))
              .catch((e: any) => handleError(e, opts));
            return applyToast(basePromise, opts?.toast);
          };
        };
      }
      else {
        return (config?: Parameters<Fn>[1]) => {
          return async (args: Parameters<Fn>[0]): Promise<Awaited<ReturnType<Fn>>> => {
            const basePromise = (fn as any)(args, injectHeaders(config))
              .then((res: any) => handleResponse(res, opts))
              .catch((e: any) => handleError(e, opts));
            return applyToast(basePromise, opts?.toast);
          };
        };
      }
    } as {
      <Config, Res>(fn: ConfigOnlyFunction<Config, Res>, opts?: TOpts<Res>): (config?: Config) => () => Promise<Res>;
      <Args, Config, Res>(fn: ArgsFunction<Args, Config, Res>, opts?: TOpts<Res>): (config?: Config) => (args: Args) => Promise<Res>;
    },

    /**
     * Higher-order function for query operations with improved type handling
     */
    queryHOF: function queryHOF<Fn extends ApiFunction>(
      fn: Fn,
      opts?: TOpts<Awaited<ReturnType<Fn>>>,
    ) {
      if (fn.length === 0) {
        return async (config?: Parameters<Fn>[0]): Promise<Awaited<ReturnType<Fn>>> => {
          const basePromise = (fn as any)(injectHeaders(config))
            .then((res: any) => handleResponse(res, opts))
            .catch((e: any) => handleError(e, opts));
          return applyToast(basePromise, opts?.toast);
        };
      }
      else {
        return async (args: Parameters<Fn>[0], config?: Parameters<Fn>[1]): Promise<Awaited<ReturnType<Fn>>> => {
          const basePromise = (fn as any)(args, injectHeaders(config))
            .then((res: any) => handleResponse(res, opts))
            .catch((e: any) => handleError(e, opts));
          return applyToast(basePromise, opts?.toast);
        };
      }
    } as {
      <Config, Res>(fn: ConfigOnlyFunction<Config, Res>, opts?: TOpts<Res>): (config?: Config) => Promise<Res>;
      <Args, Config, Res>(fn: ArgsFunction<Args, Config, Res>, opts?: TOpts<Res>): (args: Args, config?: Config) => Promise<Res>;
    },
  };
}
