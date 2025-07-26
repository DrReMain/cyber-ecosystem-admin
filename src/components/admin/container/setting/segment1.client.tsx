'use client';

import { Card, Select, Switch } from 'antd';
import { useAtom } from 'jotai';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import useLang from '@/hooks/use-lang';
import useMode from '@/hooks/use-mode';
import colors from '@/lib/constant/colors';
import { atom_setting } from '@/store/setting/store';

export default function Segment1() {
  const t = useTranslations('setting.drawer');
  const t1 = useTranslations('app.switcher');
  const { locales, submit } = useLang();
  const locale = useLocale();
  const { isReady, theme, toggle } = useMode();
  const [setting, setSetting] = useAtom(atom_setting);
  return (
    <>
      <Card size="small" title={t('language')}>
        <div className="flex flex-col gap-4 text-xs">
          <Select
            options={locales.map(({ origin, underscore }) => ({
              value: origin,
              label: t1('locale', { locale: underscore }),
            }))}
            value={locale}
            onChange={submit}
          />
        </div>
      </Card>

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
                style={(theme === 'light' ? { borderColor: setting.color } : {})}
                onClick={e => toggle(e, 'light')}
              >
                <Sun size={16} />
              </button>
              <span>{t('light')}</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2">
              <button
                type="button"
                className="w-full flex items-center justify-center rounded-md py-2 cursor-pointer border border-gray-200 dark:border-gray-800"
                style={(theme === 'dark' ? { borderColor: setting.color } : {})}
                onClick={e => toggle(e, 'dark')}
              >
                <Moon size={16} />
              </button>
              <span>{t('dark')}</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2">
              <button
                type="button"
                className="w-full flex items-center justify-center rounded-md py-2 cursor-pointer border border-gray-200 dark:border-gray-800"
                style={(theme === 'system' ? { borderColor: setting.color } : {})}
                onClick={e => toggle(e, 'system')}
              >
                <Monitor size={16} />
              </button>
              <span>{t('system')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>{t('aside-dark')}</span>
            <Switch value={setting.asideDark} onChange={_ => setSetting((s) => { s.asideDark = _; })} />
          </div>

          <div className="flex items-center justify-between">
            <span>{t('top-dark')}</span>
            <Switch value={setting.topDark} onChange={_ => setSetting((s) => { s.topDark = _; })} />
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
                style={(c === setting.color ? { borderColor: setting.color } : {})}
                onClick={() => setSetting((s) => { s.color = c; })}
              >
                <div style={{ backgroundColor: c }} className="w-5 h-5 rounded-md" />
              </button>
              <span>{t(c)}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
