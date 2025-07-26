import { createStore } from 'jotai';

import type { IStoreSetting } from '@/store/setting/store';
import type { IStoreToken } from '@/store/token/store';

import { __immerAtom_setting, atom_setting } from '@/store/setting/store';
import { __immerAtom_token, atom_token } from '@/store/token/store';

export function createMainStore(init?: {
  setting?: IStoreSetting;
  token?: IStoreToken;
}) {
  const store = createStore();

  // setting -----------------------------------------------------------------------

  if (init?.setting !== undefined) {
    store.set(__immerAtom_setting, init.setting);
  }
  const unsubSetting = store.sub(atom_setting, () => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('atom_setting value is changed to', store.get(atom_setting));
    }
  });

  // token --------------------------------------------------------------------------

  if (init?.token !== undefined) {
    store.set(__immerAtom_token, init.token);
  }
  const unsubToken = store.sub(atom_token, () => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('atom_token value is changed to', store.get(atom_token));
    }
  });

  // -------------------------------------------------------------------------------
  return {
    store,
    unsubSetting,
    unsubToken,
  };
}
