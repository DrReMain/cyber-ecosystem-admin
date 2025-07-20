import type { PropsWithChildren } from 'react';

import Guard from '@/app/[locale]/(admin)/_module/guard';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <Guard auth={true}>
      {children}
    </Guard>
  );
}
