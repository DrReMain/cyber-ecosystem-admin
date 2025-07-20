'use client';

import type { FormEvent, PropsWithChildren } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { useAtom } from 'jotai';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import useRequest from '@/hooks/use-request';
import { accountLoginPassword } from '@/services/clients/accountService/accountLoginPassword';
import { user_tokenAtom } from '@/store/user/store';

interface IProps {
}

export default function Form(_props: Readonly<PropsWithChildren<IProps>>) {
  const t = useTranslations('login');
  const [,setToken] = useAtom(user_tokenAtom);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('super@cyber-dancer.com');
  const [password, setPassword] = useState('123456');

  const { mutateHOF } = useRequest();
  const mutateLoginPassword = useMutation({
    mutationKey: [accountLoginPassword.name],
    mutationFn: mutateHOF(accountLoginPassword, {
      toast: {
        loading: true,
        success: () => t('toast.loginSuccess'),
        error: true,
      },
      format: {
        email: t('toast.email'),
        password: t('toast.passwd'),
      },
    })(),
    onSuccess: ({ data }) => {
      setToken(data.result);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateLoginPassword.mutate({ data: { email, password } });
  };

  return (
    <form className="flex flex-col gap-4 w-4/5" onSubmit={handleSubmit}>
      <h2 className="font-black text-3xl">
        {`${t('page.welcome')} 👋🏻`}
      </h2>
      <p className="text-sm text-gray-500">{t('page.explain')}</p>

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
            {t('page.emailPlaceholder')}
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
            {t('page.passwdPlaceholder')}
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
        htmlType="submit"
        block
        size="large"
        type="primary"
        loading={mutateLoginPassword.isPending}
      >
        {t('page.submit')}
      </Button>

    </form>
  );
}
