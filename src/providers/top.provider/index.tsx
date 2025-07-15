import type { PropsWithChildren } from 'react';

import NextTopLoader from 'nextjs-toploader';

export default function TopProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <NextTopLoader
        height={2}
        showSpinner={false}
        shadow={false}
        color="linear-gradient(to right, #9a16fd, #000af4, #1ee600)"
      />
      {children}
    </>
  );
}
