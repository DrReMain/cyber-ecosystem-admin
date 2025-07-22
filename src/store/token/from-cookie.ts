import superjson from 'superjson';

import { getCookieAction } from '@/server-actions/cookie.actions';

import type { IStoreToken } from './store';

import { initStoreToken, KEY_TOKEN } from './store';

export default async function tokenFromCookie(): Promise<IStoreToken> {
  const result = initStoreToken;
  const token = await getCookieAction(KEY_TOKEN);
  if (token.success && token.data) {
    try {
      return superjson.parse(token.data);
    }
    catch {}
  }
  return result;
}
