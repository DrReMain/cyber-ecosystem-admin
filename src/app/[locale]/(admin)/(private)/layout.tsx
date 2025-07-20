import type { PropsWithChildren } from 'react';

import Guard from '@/features/(admin)/guard';
import Container from '@/features/(private)/container.client';

export default async function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <Guard auth={true}>
      <Container>
        {children}
      </Container>
    </Guard>
  );
}
