'use client';

import { useMutation } from '@tanstack/react-query';
import { Avatar, Popover, Space } from 'antd';
import { useAtom } from 'jotai';
import { Lock, LogOut, User as UserIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';

import useOS from '@/hooks/use-os';
import useRequest from '@/hooks/use-request';
import { accountLogout } from '@/services/clients/accountService/accountLogout';
import { atom_token } from '@/store/token/store';

interface IProps {
  avatar?: string;
  name?: string;
  email?: string;
}

export default function User({ avatar, name, email }: Readonly<IProps>) {
  const dir = getLangDir(useLocale());
  const t = useTranslations('login.menu');
  const os = useOS();
  const [,setToken] = useAtom(atom_token);

  const { mutateHOF } = useRequest();
  const mutateLogout = useMutation({
    mutationKey: [accountLogout.name],
    mutationFn: mutateHOF(accountLogout, {
      toast: {
        loading: true,
        error: true,
      },
    })(),
    onSuccess: () => {
      setToken({});
    },
  });

  return (
    <Popover
      fresh
      trigger="click"
      placement={dir === 'rtl' ? 'bottomLeft' : 'bottomRight'}
      arrow={false}
      content={(
        <div className="-mx-4 -my-3 min-w-3xs max-w-xs flex flex-col">
          {
            name && email && (
              <>
                <div className="p-2 flex flex-col gap-1">
                  <div className="font-black text-sm truncate">
                    {name}
                  </div>
                  <div className="font-thin text-xs truncate">
                    {email}
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-800" />
              </>
            )
          }

          <div className="p-1">
            <button
              type="button"
              className="w-full rounded-md cursor-pointer py-1 px-2 flex items-center justify-between hover:bg-black/5"
            >
              <Space>
                <Lock size={14} />
                <span className="text-sm">{t('lock')}</span>
              </Space>

              <span className="font-mono">
                {os === 'macos' ? '⌥ + l' : 'Alt + l'}
              </span>
            </button>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-800" />

          <div className="p-1">
            <button
              type="button"
              className="w-full rounded-md cursor-pointer py-1 px-2 flex items-center justify-between hover:bg-black/5"
              onClick={() => mutateLogout.mutate({ data: {} })}
            >
              <Space>
                <LogOut size={14} />
                <span className="text-sm">{t('logout')}</span>
              </Space>

              <span className="font-mono">
                {os === 'macos' ? '⌥ + q' : 'Alt + q'}
              </span>
            </button>
          </div>
        </div>
      )}
    >
      <button type="button" className="cursor-pointer rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-700">
        <Avatar icon={<UserIcon size={14} />} src={avatar || undefined} />
      </button>
    </Popover>
  );
}
