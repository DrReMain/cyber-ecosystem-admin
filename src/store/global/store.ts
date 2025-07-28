import superjson from 'superjson';

import { createPersistentAtom } from '@/store/factory';

export interface IStoreGlobal {
  openSetting: boolean;
  openLock: boolean;
  lockPW: string;
}

export const initStoreGlobal: IStoreGlobal = {
  openSetting: false,
  openLock: false,
  lockPW: '',
};

export const KEY_GLOBAL = 'JT_GLOBAL';
export const {
  immerAtomic: __immerAtom_global,
  atomic: atom_global,
} = createPersistentAtom<IStoreGlobal>(
  KEY_GLOBAL,
  initStoreGlobal,
  false,
  value => superjson.stringify(value),
);
