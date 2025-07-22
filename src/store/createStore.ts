import { createStore } from 'jotai';

import type { IStoreSetting } from '@/store/setting/store';
import type { IStoreToken } from '@/store/token/store';

import { __settingImmerAtom, setting_Atom } from '@/store/setting/store';
import { __tokenImmerAtom, token_Atom } from '@/store/token/store';

export function createMainStore(init?: {
  setting?: IStoreSetting;
  token?: IStoreToken;
}) {
  const store = createStore();

  // setting -----------------------------------------------------------------------

  if (init?.setting !== undefined) {
    store.set(__settingImmerAtom, init.setting);
  }
  const unsubSetting = store.sub(setting_Atom, () => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('setting_Atom value is changed to', store.get(setting_Atom));
    }
  });

  // token --------------------------------------------------------------------------

  if (init?.token !== undefined) {
    store.set(__tokenImmerAtom, init.token);
  }
  const unsubToken = store.sub(token_Atom, () => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('token_Atom value is changed to', store.get(token_Atom));
    }
  });

  // -------------------------------------------------------------------------------
  return {
    store,
    unsubSetting,
    unsubToken,
  };
}
