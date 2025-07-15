import type { PropsWithChildren } from 'react';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <Toaster
        toastOptions={{
          className: '!max-w-2/3 !rounded-2xl dark:!bg-slate-900 dark:!text-white',
        }}
      />
      {children}
    </>
  );
}
