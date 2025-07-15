'use client';

import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';

export default function Page404() {
  const t = useTranslations('app.404');
  const router = useRouter();
  return (
    <div className="w-full h-full flex">
      <section className="flex-1 hidden lg:flex items-center justify-end mx-8">
        <Image src="/images/404.svg" alt="404" width={400} height={400} priority />
      </section>

      <section className="w-0 flex-1 flex flex-col items-start justify-center gap-2 mx-8 font-sans">
        <h3 className="text-blue-500 font-black">
          404
        </h3>
        <p className="text-gray-800 dark:text-gray-200 text-3xl">
          {t('title')}
        </p>
        <p className="text-gray-600">
          {t('content')}
        </p>

        <div className="flex gap-8">
          <button
            type="button"
            className="cursor-pointer bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white rounded-xl py-2 px-4 flex items-center gap-x-2"
            onClick={() => router.push('/')}
          >
            <Home className="w-4 h-4" />
            {t('home')}
          </button>

          <button
            type="button"
            className="cursor-pointer text-blue-500 hover:text-blue-400 duration-150 flex items-center gap-x-1"
            onClick={() => router.back()}
          >
            {t('back')}
            <span className="rtl:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>

      </section>
    </div>
  );
}
