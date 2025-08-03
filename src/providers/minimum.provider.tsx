import type { PropsWithChildren } from 'react';

import NextIntlProvider from '@/providers/intl.provider';
import ThemesProvider from '@/providers/themes.provider';
import ToastProvider from '@/providers/toast.provider';

export default function MinimumProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <NextIntlProvider>
      <ThemesProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ThemesProvider>
    </NextIntlProvider>
  );
}
