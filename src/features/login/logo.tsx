import type { PropsWithChildren } from 'react';

import Image from 'next/image';

export default async function Logo(_props: Readonly<PropsWithChildren>) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <Image src="/images/logo.png" alt="logo" priority fill sizes="48px" className="object-contain" />
      </div>
      <h1 className="font-black text-2xl">CYBER ECOSYSTEM</h1>
    </div>
  );
}
