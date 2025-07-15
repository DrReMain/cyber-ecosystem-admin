import type { Locale } from 'next-intl';
import type { PropsWithChildren } from 'react';

import AntdConfig from '@/providers/antd.provider/config';
import HolderRender from '@/providers/antd.provider/holder-render';

export default function AntdProvider({ children, locale, theme }: Readonly<PropsWithChildren<{
  locale: Locale;
  theme?: string;
}>>) {
  return (
    <AntdConfig locale={locale} theme={theme}>
      <HolderRender>
        {children}
      </HolderRender>
    </AntdConfig>
  );
}
