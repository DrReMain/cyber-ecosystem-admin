import { useAtomValue } from 'jotai';

import { user_tokenAtom } from '@/store/user/store';

type RequestFunction<Args, Config, Res> = (args: Args, config?: Config) => Promise<Res>;

export default function useRequest() {
  const token = useAtomValue(user_tokenAtom);

  function injectHeaders<Config>(config: Config): Config {
    return {
      headers: {
        ...(token?.access_token ? { Authorization: `Bearer ${token.access_token}` } : {}),
        ...((config as any)?.headers ?? {}),
      },
      ...config,
    } as Config;
  }

  // TODO: judge to new BizError
  function handleResponse<Res>(res: Res): Res {
    return res;
  }

  // TODO: ZodError, HTTPError, TimeoutError, AbortError, BizError
  function handleError(e: any): never {
    throw e;
  }

  return {
    mutateHOF<Args, Config, Res>(fn: RequestFunction<Args, Config, Res>) {
      return (config?: Config) =>
        async (args: Args): Promise<Res> =>
          fn(args, injectHeaders(config))
            .then(res => handleResponse(res))
            .catch(e => handleError(e));
    },
    queryHOF<Args, Config, Res>(fn: RequestFunction<Args, Config, Res>) {
      return async (args: Args, config?: Config): Promise<Res> =>
        fn(args, injectHeaders(config))
          .then(res => handleResponse(res))
          .catch(e => handleError(e));
    },
  };
}
