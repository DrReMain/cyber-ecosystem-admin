import type { PropsWithChildren } from 'react';

import Entry from '@/components/admin/entry';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <Entry>
      {children}
    </Entry>
  );
}
