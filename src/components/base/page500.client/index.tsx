'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';

export default function Page500(props: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  const t = useTranslations('app.500');
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-center font-bold text-red-600">
          {t('title')}
        </h1>
        <p className="text-center text-gray-600">
          {t('content')}
        </p>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <details className="w-3/4 m-4 p-4 overflow-auto bg-gray-100 dark:bg-gray-900 rounded text-left text-sm">
          <summary className="cursor-pointer font-medium">
            technicalDetails
          </summary>
          <pre className="mt-2 whitespace-pre-wrap">
            {props.error.stack}
          </pre>
        </details>
      )}

      <div className="flex flex-col gap-4 min-w-64">
        <button
          type="button"
          onClick={props.reset}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {t('retry')}
        </button>

        <button
          type="button"
          onClick={() => router.replace('/')}
          className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
        >
          {t('home')}
        </button>
      </div>
    </div>
  );
}
