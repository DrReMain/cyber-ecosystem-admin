'use client';

import { Dropdown } from 'antd';
import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Ctl from '@/components/admin/container/ctl/ctl.client';
import useLang from '@/hooks/use-lang';

export default function Lang() {
  const t = useTranslations('app.switcher');
  const { locales, submit } = useLang();
  return (
    <Ctl>
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
        <Languages width={16} height={16} />
      </Dropdown>
    </Ctl>
  );
}
