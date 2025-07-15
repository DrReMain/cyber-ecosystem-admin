import type { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return children;
}
