import { getCookieAction } from '@/server-actions/cookie.actions';

import type { IStoreSetting } from './store';

import { KEY_SETTING_COLOR } from './store';

export default async function jtSettingHydrate(): Promise<IStoreSetting> {
  const result: IStoreSetting = {};
  const [color] = await Promise.all([
    getCookieAction(KEY_SETTING_COLOR),
  ]);
  if (color.success && color.data) {
    result.color = color.data;
  }
  return result;
}
