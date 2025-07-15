'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';

export default function Error({ error, reset }: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  const t = useTranslations('app.500');

  const router = useRouter();

  // useEffect(() => {
  // 可选：将错误记录到错误报告服务
  // console.error('Application error:', error);
  // }, [error]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="mb-8">
        <h1 className="text-4xl text-center font-bold text-red-600 mb-4">
          {t('title')}
        </h1>
        <p className="text-center text-gray-600 mb-4">
          {t('content')}
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded text-left text-sm">
            <summary className="cursor-pointer font-medium">
              technicalDetails
            </summary>
            <pre className="mt-2 whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        )}
      </div>

      <div className="flex flex-col gap-2 min-w-96">
        <button
          type="button"
          onClick={reset}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('retry')}
        </button>

        <button
          type="button"
          onClick={() => router.replace('/')}
          className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          {t('home')}
        </button>
      </div>
    </div>
  );
}
