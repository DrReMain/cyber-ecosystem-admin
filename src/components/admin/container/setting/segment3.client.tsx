'use client';

import { Card, Space, Switch, Tag } from 'antd';
import { useAtom } from 'jotai/index';
import { useTranslations } from 'next-intl';

import useOS from '@/hooks/use-os';
import { setting_Atom } from '@/store/setting/store';

// ⌘

export default function Segment3() {
  const t = useTranslations('setting.drawer');
  const os = useOS();
  const [setting, setSetting] = useAtom(setting_Atom);

  return (
    <Card size="small">
      <div className="flex flex-col gap-4 text-xs">
        <div className="flex items-center justify-between">
          <span>{t('shortcut')}</span>
          <Switch
            value={setting.shortcuts.enable}
            onChange={_ => setSetting((s) => { s.shortcuts.enable = _; })}
          />
        </div>

        <div className="flex items-center justify-between">
          <span>{t('shortcut-lock')}</span>

          <Space>
            <Tag className="font-mono" bordered={false}>
              {os === 'macos' ? '⌥ + l' : 'Alt + l'}
            </Tag>
            <Switch
              disabled={!setting.shortcuts.enable}
              value={setting.shortcuts.lock}
              onChange={_ => setSetting((s) => { s.shortcuts.lock = _; })}
            />
          </Space>
        </div>

        <div className="flex items-center justify-between">
          <span>{t('shortcut-logout')}</span>

          <Space>
            <Tag className="font-mono" bordered={false}>
              {os === 'macos' ? '⌥ + q' : 'Alt + q'}
            </Tag>
            <Switch
              disabled={!setting.shortcuts.enable}
              value={setting.shortcuts.logout}
              onChange={_ => setSetting((s) => { s.shortcuts.logout = _; })}
            />
          </Space>
        </div>
      </div>
    </Card>
  );
}
