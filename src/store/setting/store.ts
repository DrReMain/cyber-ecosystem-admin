import superjson from 'superjson';

import { createPersistentAtom } from '@/store/factory';

export interface IStoreSetting {
  color: string;
  asideDark: boolean;
  topDark: boolean;
  layout: 'vertical' | 'two-vertical' | 'horizontal' | 'aside-vertical' | 'mixed-vertical' | 'mixed-two-vertical';
  content: 'wide' | 'fixed';
  shortcuts: {
    enable: boolean;
    lock: boolean;
    logout: boolean;
  };
  watermark: {
    enable: boolean;
    content: string | string[];
    image: string;
  };
}

export const initStoreSetting: IStoreSetting = {
  color: '#1677ff',
  asideDark: false,
  topDark: false,
  layout: 'vertical',
  content: 'wide',
  shortcuts: {
    enable: true,
    lock: true,
    logout: true,
  },
  watermark: {
    enable: true,
    content: ['Cyber Ecosystem', 'Dr.ReMain'],
    image: '',
  },
};

export const KEY_SETTING = 'JT_SETTING';
export const {
  immerAtomic: __immerAtom_setting,
  atomic: atom_setting,
} = createPersistentAtom<IStoreSetting>(
  KEY_SETTING,
  initStoreSetting,
  true,
  value => superjson.stringify(value),
);
