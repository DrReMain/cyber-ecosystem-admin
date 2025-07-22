import superjson from 'superjson';

import { getCookieAction } from '@/server-actions/cookie.actions';

import type { IStoreSetting } from './store';

import { initStoreSetting, KEY_SETTING } from './store';

export default async function settingFromCookie(): Promise<IStoreSetting> {
  const result = initStoreSetting;
  const setting = await getCookieAction(KEY_SETTING);
  if (setting.success && setting.data) {
    try {
      return superjson.parse(setting.data);
    }
    catch {}
  }
  return result;
}
