'use client';

import { Card } from 'antd';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { atom_setting } from '@/store/setting/store';

const layouts = [
  { type: 'vertical' },
  { type: 'two-vertical' },
  { type: 'horizontal' },
  { type: 'aside-vertical' },
  { type: 'mixed-vertical' },
  { type: 'mixed-two-vertical' },
] as const;

const contents = [
  { type: 'wide' },
  { type: 'fixed' },
] as const;

export default function Segment2() {
  const t = useTranslations('setting.drawer');
  const [setting, setSetting] = useAtom(atom_setting);
  return (
    <>
      <Card size="small" title={t('layout')}>
        <div className="grid grid-cols-3 gap-4 text-xs">
          {layouts.map(({ type }) => (
            <div key={type} className="flex flex-col items-center gap-2">
              <button
                type="button"
                className="w-full rounded-md p-1 cursor-pointer outline-4 outline-gray-200 dark:outline-gray-800 bg-white"
                style={{
                  ...(setting.layout === type ? { outlineColor: setting.color } : {}),
                }}
                onClick={() => setSetting((s) => { s.layout = type; })}
              >
                <Image src={`/images/layout/${type}.svg`} alt={type} width={400} height={400} priority />
              </button>
              <span>{t(type)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card size="small" title={t('content')}>
        <div className="grid grid-cols-3 gap-4 text-xs">
          {contents.map(({ type }) => (
            <div key={type} className="flex flex-col items-center gap-2">
              <button
                type="button"
                className="w-full rounded-md p-1 cursor-pointer outline-4 outline-gray-200 dark:outline-gray-800 bg-white"
                style={{
                  ...(setting.content === type ? { outlineColor: setting.color } : {}),
                }}
                onClick={() => setSetting((s) => { s.content = type; })}
              >
                <Image src={`/images/layout/content-${type}.svg`} alt={type} width={400} height={400} priority />
              </button>
              <span>{t(type)}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
