'use client';

import { Card, Switch } from 'antd';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { setting_Atom } from '@/store/setting/store';

export default function Segment4() {
  const t = useTranslations('setting.drawer');
  const [setting, setSetting] = useAtom(setting_Atom);
  return (
    <Card size="small">
      <div className="flex flex-col gap-4 text-xs">
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
