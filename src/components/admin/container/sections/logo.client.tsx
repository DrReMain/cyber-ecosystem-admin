'use client';

import { useAtomValue } from 'jotai';
import Image from 'next/image';

import { atom_setting } from '@/store/setting/store';

interface IProps {
}

export default function Logo(_props: Readonly<IProps>) {
  const setting = useAtomValue(atom_setting);
  return (
    <div
      className={`h-12 w-full flex items-center gap-1 p-1 ${
        setting.foldMenu ? 'justify-center' : 'justify-start'
      }`}
    >
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="logo"
          priority
          fill
          sizes="32px"
          className="object-contain"
        />
      </div>
      {!setting.foldMenu && (
        <h1 className="font-black text-xl truncate whitespace-nowrap">
          CYBER ECOSYSTEM
        </h1>
      )}
    </div>
  );
}
