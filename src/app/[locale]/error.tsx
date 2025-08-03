'use client';

import Page500 from '@/components/base/page500.client';

export default function Error({ error, reset }: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  // useEffect(() => {
  // report
  // console.error('Application error:', error);
  // }, [error]);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Page500 error={error} reset={reset} />
    </div>
  );
}
