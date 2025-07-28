'use client';

import type { PropsWithChildren } from 'react';

import { Dropdown } from 'antd';
import { useAtom } from 'jotai';
import { Check, Languages, Moon, Palette, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import colors from '@/lib/constant/colors';
import useLang from '@/lib/hooks/use-lang';
import useMode from '@/lib/hooks/use-mode';
import { atom_setting } from '@/store/setting/store';

interface IProps {
}

export default function Config(_props: Readonly<PropsWithChildren<IProps>>) {
  const t = useTranslations('app.switcher');
  const { locales, submit } = useLang();
  const { resolvedTheme, toggle, isReady } = useMode();
  const [setting, setSetting] = useAtom(atom_setting);

  const [show, setShow] = useState(false);

  return (
    <div className="absolute top-4 end-4 h-8 rounded-full flex items-center gap-2 px-4 bg-gray-300 dark:bg-gray-700">
      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute h-8 top-0 end-full overflow-hidden"
            key="colors"
            initial={{ opacity: 0, width: 0, x: 0 }}
            animate={{ opacity: 1, width: 'auto', x: -8 }}
            exit={{ opacity: 0, width: 0, x: 0 }}
          >
            <div className="h-full rounded-full flex items-center gap-1 px-2 bg-gray-300 dark:bg-gray-700">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  className="w-4 h-4 flex items-center justify-center text-white rounded-full cursor-pointer hover:scale-110"
                  style={{ backgroundColor: c }}
                  onClick={() => setSetting((s) => { s.color = c; })}
                >
                  {setting.color === c ? <Check size={12} /> : null}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Palette className="cursor-pointer hidden lg:block" size={14} onClick={() => setShow(_ => !_)} />

      <Dropdown
        trigger={['click']}
        menu={{
          items: locales.map(({ origin, underscore }) => ({
            key: origin,
            label: t('locale', { locale: underscore }),
            onClick: () => submit(origin),
          })),
        }}
      >
        <Languages className="cursor-pointer" size={14} />
      </Dropdown>

      {isReady && (
        resolvedTheme === 'dark'
          ? (
              <Sun className="cursor-pointer" size={14} onClick={e => toggle(e, 'light')} />
            )
          : (
              <Moon className="cursor-pointer" size={14} onClick={e => toggle(e, 'dark')} />
            )
      )}
    </div>
  );
}
