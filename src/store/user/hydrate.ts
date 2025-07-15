import superjson from 'superjson';

import { getCookieAction } from '@/server-actions/cookie.actions';

import type { IStoreUser } from './store';

import { KEY_USER_TOKEN } from './store';

export default async function jtUserHydrate(): Promise<IStoreUser> {
  const result: IStoreUser = {};
  const [token] = await Promise.all([
    getCookieAction(KEY_USER_TOKEN),
  ]);
  if (token.success && token.data) {
    try {
      result.token = superjson.parse(token.data);
    }
    catch {
      result.token = null;
    }
  }
  return result;
}
