import superjson from 'superjson';

import { createPersistentAtom } from '@/store/factory';

export interface IStoreGlobal {
  openLock: boolean;
  lockPW: string;
  menus: Set<string>;
}

export const initStoreGlobal: IStoreGlobal = {
  openLock: false,
  lockPW: '',
  menus: new Set(),
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
