import { createPersistentAtom } from '@/store/factory';

export interface IStoreSetting {
  color?: string;
}

export const KEY_SETTING_COLOR = 'JT_SETTING_COLOR';
export const {
  immerAtomic: __settingColorImmerAtom,
  atomic: setting_colorAtom,
} = createPersistentAtom<IStoreSetting['color']>(
  KEY_SETTING_COLOR,
  '',
  value => value || '',
);
