import type { PropsWithChildren } from 'react';

import TokenGuard from '@/components/admin/token.guard';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <TokenGuard needToken={false}>
      {children}
    </TokenGuard>
  );
}
