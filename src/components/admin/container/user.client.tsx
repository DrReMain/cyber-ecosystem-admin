'use client';

import { useClickAway } from 'ahooks';
import { Avatar, Popover, Space, Spin } from 'antd';
import { useAtomValue } from 'jotai';
import { Lock, LogOut, User as UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import useRTL from '@/lib/hooks/use-rtl';
import { useShortcuts } from '@/lib/hooks/use-shortcuts';
import { atom_setting } from '@/store/setting/store';

interface IProps {
  isPending: boolean;
  avatar?: string;
  name?: string;
  email?: string;
}

export default function User({ isPending, avatar, name, email }: Readonly<IProps>) {
  const isRTL = useRTL();
  const t = useTranslations('login.menu');
  const setting = useAtomValue(atom_setting);
  const [open, setOpen] = useState(false);

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  useClickAway(() => {
    setOpen(false);
  }, [ref1, ref2]);

  const { lock, logout } = useShortcuts();

  const handleLock = () => {
    setOpen(false);
    lock.cb(true);
  };

  const handleLogout = () => {
    setOpen(false);
    logout.cb(true);
  };

  return (
    <Spin size="small" spinning={isPending}>
      <Popover
        open={open}
        placement={isRTL ? 'bottomLeft' : 'bottomRight'}
        arrow={false}
        content={(
          <div ref={ref1} className="-mx-4 -my-3 min-w-3xs max-w-xs flex flex-col">
            {name && email && (
              <>
                <div className="p-2 flex flex-col gap-1">
                  <div className="font-black text-sm truncate">{name}</div>
                  <div className="font-thin text-xs truncate">{email}</div>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-800" />
              </>
            )}

            <div className="p-1">
              <button
                type="button"
                className="w-full rounded-md cursor-pointer py-1 px-2 flex items-center justify-between hover:bg-black/5"
                onClick={handleLock}
              >
                <Space>
                  <Lock size={14} />
                  <span className="text-sm">{t('lock')}</span>
                </Space>
                <span className="font-mono">
                  {setting.shortcuts.enable && setting.shortcuts.lock && lock.text}
                </span>
              </button>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800" />

            <div className="p-1">
              <button
                type="button"
                className="w-full rounded-md cursor-pointer py-1 px-2 flex items-center justify-between hover:bg-black/5"
                onClick={handleLogout}
              >
                <Space>
                  <LogOut size={14} />
                  <span className="text-sm">{t('logout')}</span>
                </Space>
                <span className="font-mono">
                  {setting.shortcuts.enable && setting.shortcuts.logout && logout.text}
                </span>
              </button>
            </div>
          </div>
        )}
      >
        <button
          ref={ref2}
          type="button"
          className="cursor-pointer rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-700"
          onClick={() => setOpen(_ => !_)}
        >
          <Avatar icon={<UserIcon size={14} />} src={avatar || undefined} />
        </button>
      </Popover>
    </Spin>
  );
}
