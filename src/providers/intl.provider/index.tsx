import type { PropsWithChildren } from 'react';

import { NextIntlClientProvider } from 'next-intl';

export default function NextIntlProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}
