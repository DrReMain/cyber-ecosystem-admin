import { createStore } from 'jotai';

import type { IStoreSetting } from '@/store/setting/store';
import type { IStoreUser } from '@/store/user/store';

import { __settingColorImmerAtom, setting_colorAtom } from '@/store/setting/store';
import { __userTokenImmerAtom, user_tokenAtom } from '@/store/user/store';

export function createMainStore(init?: {
  setting?: IStoreSetting;
  user?: IStoreUser;
}) {
  const store = createStore();

  // setting -----------------------------------------------------------------------

  if (init?.setting?.color !== undefined) {
    store.set(__settingColorImmerAtom, init.setting.color);
  }
  const unsubSettingColor = store.sub(setting_colorAtom, () => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('setting_ColorAtom value is changed to', store.get(setting_colorAtom));
    }
  });

  // user --------------------------------------------------------------------------

  if (init?.user?.token !== undefined) {
    store.set(__userTokenImmerAtom, init.user.token);
  }
  const unsubUserToken = store.sub(user_tokenAtom, () => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('user_tokenAtom value is changed to', store.get(user_tokenAtom));
    }
  });

  // -------------------------------------------------------------------------------
  return {
    store,
    unsubSettingColor,
    unsubUserToken,
  };
}
