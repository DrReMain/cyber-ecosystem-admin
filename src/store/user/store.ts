import superjson from 'superjson';

import { createPersistentAtom } from '@/store/factory';

export interface IStoreUser {
  token?: null | { access_token: string; access_expire: number; refresh_token: string; refresh_expire: number };
}

export const KEY_USER_TOKEN = 'JT_USER_TOKEN';
export const {
  immerAtomic: __userTokenImmerAtom,
  atomic: user_tokenAtom,
} = createPersistentAtom<IStoreUser['token']>(
  KEY_USER_TOKEN,
  null,
  value => superjson.stringify(value),
);
