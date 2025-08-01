'use client';

import type { PropsWithChildren, Ref } from 'react';

import { Badge, Button, Drawer, Segmented, Space, Tooltip } from 'antd';
import { useAtom } from 'jotai';
import { Undo } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useImperativeHandle, useState } from 'react';

import Segment1 from '@/components/admin/container/setting/segment1.client';
import Segment2 from '@/components/admin/container/setting/segment2.client';
import Segment3 from '@/components/admin/container/setting/segment3.client';
import Segment4 from '@/components/admin/container/setting/segment4.client';
import useRTL from '@/hooks/use-rtl';
import { atom_setting, initStoreSetting } from '@/store/setting/store';

export interface IRef {
  open: () => void;
}

interface IProps {
  ref: Ref<IRef>;
}

export default function SettingDrawer({ ref }: Readonly<PropsWithChildren<IProps>>) {
  const isRTL = useRTL();
  const t = useTranslations('setting.drawer');

  const [setting, setSetting] = useAtom(atom_setting);

  const segments = ['1', '2', '3', '4'] as const;
  const [segment, setSegment] = useState<typeof segments[number]>('1');

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true);
    },
  }), []);

  return (
    <Drawer
      title={t('title')}
      open={open}
      onClose={() => setOpen(false)}
      placement={isRTL ? 'left' : 'right'}
      extra={(
        <Space>
          <Badge dot={JSON.stringify(setting) !== JSON.stringify(initStoreSetting)}>
            <Tooltip arrow={false} title={t('reset')}>
              <Button
                size="small"
                color="default"
                variant="filled"
                icon={<Undo width={12} height={12} />}
                onClick={() => setSetting(initStoreSetting)}
              />
            </Tooltip>
          </Badge>
        </Space>
      )}
    >
      <div className="flex flex-col gap-2">
        <Segmented<string>
          block
          value={segment}
          options={segments.map(value => ({ className: 'm-0.5', label: t(`segment${value}`), value }))}
          onChange={value => setSegment(value as typeof segments[number])}
        />
        {segment === segments[0] && <Segment1 />}
        {segment === segments[1] && <Segment2 />}
        {segment === segments[2] && <Segment3 />}
        {segment === segments[3] && <Segment4 />}
      </div>
    </Drawer>
  );
}
