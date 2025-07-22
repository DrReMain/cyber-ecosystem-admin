'use client';

import { Card, Switch } from 'antd';
import { useAtom } from 'jotai';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

import useMode from '@/hooks/use-mode';
import colors from '@/lib/constant/colors';
import { setting_colorAtom } from '@/store/setting/store';

export default function Segment1() {
  const t = useTranslations('setting.drawer');
  const { isReady, theme, toggle } = useMode();
  const [color, setColor] = useAtom(setting_colorAtom);

  return (
    <>
      <Card
        loading={!isReady}
        size="small"
        title={t('light-dark')}
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex flex-col items-center gap-2">
              <button
                type="button"
                className="w-full flex items-center justify-center rounded-md py-2 cursor-pointer border border-gray-200 dark:border-gray-800"
                style={(theme === 'light' ? { borderColor: color } : {})}
                onClick={e => toggle(e, 'light')}
              >
                <Sun width={16} height={16} />
              </button>
              <span>{t('light')}</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2">
              <button
                type="button"
                className="w-full flex items-center justify-center rounded-md py-2 cursor-pointer border border-gray-200 dark:border-gray-800"
                style={(theme === 'dark' ? { borderColor: color } : {})}
                onClick={e => toggle(e, 'dark')}
              >
                <Moon width={16} height={16} />
              </button>
              <span>{t('dark')}</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2">
              <button
                type="button"
                className="w-full flex items-center justify-center rounded-md py-2 cursor-pointer border border-gray-200 dark:border-gray-800"
                style={(theme === 'system' ? { borderColor: color } : {})}
                onClick={e => toggle(e, 'system')}
              >
                <Monitor width={16} height={16} />
              </button>
              <span>{t('system')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>{t('aside-dark')}</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <span>{t('top-dark')}</span>
            <Switch />
          </div>
        </div>
      </Card>

      <Card
        size="small"
        title={t('primary')}
      >
        <div className="grid grid-cols-3 gap-4 text-xs">
          {colors.map(c => (
            <div key={c} className="flex flex-col items-center gap-2">
              <button
                type="button"
                className="w-full flex items-center justify-center rounded-md py-2 cursor-pointer border border-gray-200 dark:border-gray-800"
                style={(c === color ? { borderColor: color } : {})}
                onClick={() => setColor(c)}
              >
                <div style={{ backgroundColor: c }} className="w-5 h-5 rounded-md" />
              </button>
              <span>{t(c)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card
        size="small"
        title={t('other')}
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex items-center justify-between">
            <span>{t('cb-mode')}</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <span>{t('gray-mode')}</span>
            <Switch />
          </div>
        </div>
      </Card>
    </>
  );
}
