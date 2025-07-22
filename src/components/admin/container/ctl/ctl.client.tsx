'use client';

import type { MouseEventHandler, PropsWithChildren } from 'react';

interface IProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Ctl({ children, onClick }: Readonly<PropsWithChildren<IProps>>) {
  return (
    <button
      type="button"
      className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
