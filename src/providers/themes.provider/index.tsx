import type { PropsWithChildren } from 'react';

import { ThemeProvider } from 'next-themes';

export default function ThemesProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <ThemeProvider
      enableSystem={true}
      enableColorScheme={true}
      disableTransitionOnChange={false}
      attribute="class"
      // nonce={}
    >
      {children}
    </ThemeProvider>
  );
}
