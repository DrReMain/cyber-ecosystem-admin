'use client';

import type { PropsWithChildren } from 'react';

import { Button } from 'antd';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface IProps {
}

export default function Form(_props: Readonly<PropsWithChildren<IProps>>) {
  const t = useTranslations('login.page');
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('super@cyber-dancer.com');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col gap-4 w-4/5">
      <h2 className="font-black text-3xl">
        {`${t('welcome')} 👋🏻`}
      </h2>
      <p className="text-sm text-gray-500">{t('explain')}</p>

      <div>
        <label htmlFor="Email" className="relative">
          <input
            type="text"
            id="Email"
            placeholder=""
            autoComplete="off"
            className="peer mt-0.5 w-full rounded-xl border-transparent sm:text-sm dark:bg-gray-900 dark:text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-2 rounded text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 dark:bg-gray-900 dark:text-white">
            {t('emailPlaceholder')}
          </span>
        </label>
      </div>

      <div>
        <label htmlFor="Password" className="relative">
          <input
            type={show ? 'text' : 'password'}
            id="Password"
            placeholder=""
            autoComplete="off"
            className="peer mt-0.5 w-full rounded-xl border-transparent sm:text-sm dark:bg-gray-900 dark:text-white"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-2 rounded text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 dark:bg-gray-900 dark:text-white">
            {t('passwdPlaceholder')}
          </span>

          <span className="absolute inset-y-0 end-2 grid w-8 place-content-center">
            <button
              type="button"
              aria-label="Submit"
              className="rounded-full p-1.5  cursor-pointer text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              onClick={() => setShow(_ => !_)}
            >
              {show ? <Eye width={16} height={16} /> : <EyeOff width={16} height={16} />}
            </button>
          </span>
        </label>
      </div>

      <Button
        block
        size="large"
        type="primary"
      >
        {t('submit')}
      </Button>

    </div>
  );
}
