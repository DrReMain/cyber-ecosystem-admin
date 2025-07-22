import superjson from 'superjson';

import { createPersistentAtom } from '@/store/factory';

export interface IStoreToken {
  access_token?: string;
  access_expire?: number;
  refresh_token?: string;
  refresh_expire?: number;
}

export const initStoreToken: IStoreToken = {
};

export const KEY_TOKEN = 'JT_TOKEN';
export const {
  immerAtomic: __tokenImmerAtom,
  atomic: token_Atom,
} = createPersistentAtom<IStoreToken>(
  KEY_TOKEN,
  initStoreToken,
  true,
  value => superjson.stringify(value),
);
