import type { Draft } from 'immer';

import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

import { setCookieAction } from '@/server-actions/cookie.actions';

export function createPersistentAtom<T>(
  key: string,
  initialValue: T,
  persist: boolean,
  serialize: (value: T) => string = String,
) {
  const immerAtomic = atomWithImmer<T>(initialValue);
  const atomic = atom(
    get => get(immerAtomic),
    (get, set, update: T | ((draft: Draft<T>) => void)) => {
      set(immerAtomic, update);
      if (persist) {
        const newValue = get(immerAtomic);
        if (newValue !== undefined) {
          void setCookieAction(
            key,
            serialize(newValue),
          );
        }
      }
    },
  );

  immerAtomic.debugLabel = `__${key}Atom`;
  atomic.debugLabel = `${key}Atom`;

  return { immerAtomic, atomic };
}
