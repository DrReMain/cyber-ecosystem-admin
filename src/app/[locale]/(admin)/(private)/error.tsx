'use client';

import { Button, Result } from 'antd';
import { useTranslations } from 'next-intl';

export default function Error({ error, reset }: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  const t = useTranslations('app');
  // useEffect(() => {
  // report
  // console.error('Application error:', error);
  // }, [error]);

  const render = () => {
    switch (error.message) {
      case '403':
        return (
          <Result
            status="403"
            title={t('403.title')}
            subTitle={t('403.content')}
          />
        );
      default:
        return (
          <Result
            status="500"
            title={t('500.title')}
            subTitle={t('500.content')}
            extra={<Button type="primary" onClick={reset}>{t('500.retry')}</Button>}
          />
        );
    }
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {render()}
    </div>
  );
}
