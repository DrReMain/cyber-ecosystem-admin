'use client';

import type { PropsWithChildren, Ref } from 'react';

import { Drawer, Flex, Segmented } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useImperativeHandle, useState } from 'react';
import { getLangDir } from 'rtl-detect';

import Segment1 from '@/components/admin/container/setting/segment1.client';
import Segment2 from '@/components/admin/container/setting/segment2.client';
import Segment3 from '@/components/admin/container/setting/segment3.client';
import Segment4 from '@/components/admin/container/setting/segment4.client';

export interface IRef {
  open: () => void;
}

interface IProps {
  ref: Ref<IRef>;
}

export default function SettingDrawer({ ref }: Readonly<PropsWithChildren<IProps>>) {
  const dir = getLangDir(useLocale());
  const t = useTranslations('setting.drawer');

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
      placement={dir === 'rtl' ? 'left' : 'right'}
    >
      <Flex vertical gap="middle">
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
      </Flex>
    </Drawer>
  );
}
