import type { PropsWithChildren } from 'react';

import Container from '@/components/admin/container/container.client';
import TokenGuard from '@/components/admin/token.guard';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <TokenGuard needToken={true}>
      <Container>
        {children}
      </Container>
    </TokenGuard>
  );
}
