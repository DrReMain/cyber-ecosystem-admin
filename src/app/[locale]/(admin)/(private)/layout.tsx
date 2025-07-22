import type { PropsWithChildren } from 'react';

import Container from '@/components/admin/container/container.client';
import Guard from '@/components/admin/guard';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <Guard auth={true}>
      <Container>
        {children}
      </Container>
    </Guard>
  );
}

export const dynamic = 'force-dynamic';
