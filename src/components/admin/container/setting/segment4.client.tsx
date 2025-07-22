'use client';

import { Card, Select, Switch } from 'antd';
import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';

import useLang from '@/hooks/use-lang';
import { setting_Atom } from '@/store/setting/store';

export default function Segment4() {
  const t = useTranslations('setting.drawer');
  const t1 = useTranslations('app.switcher');
  const { locales, submit } = useLang();
  const locale = useLocale();
  const [setting, setSetting] = useAtom(setting_Atom);
  return (
    <Card size="small">
      <div className="flex flex-col gap-4 text-xs">
        <div className="flex items-center justify-between">
          <span>{t('language')}</span>
          <Select
            className="w-1/2"
            options={locales.map(({ origin, underscore }) => ({
              value: origin,
              label: t1('locale', { locale: underscore }),
            }))}
            value={locale}
            onChange={submit}
          />
        </div>

        <div className="flex items-center justify-between">
          <span>{t('watermark')}</span>
          <Switch
            value={setting.watermark.enable}
            onChange={_ => setSetting((s) => { s.watermark.enable = _; })}
          />
        </div>
      </div>
    </Card>
  );
}
