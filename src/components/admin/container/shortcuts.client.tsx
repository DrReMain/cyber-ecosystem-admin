'use client';

import type { PropsWithChildren } from 'react';

import { useKeyPress } from 'ahooks';

import { useShortcuts } from '@/lib/hooks/use-shortcuts';

interface IProps {
}

export default function Shortcuts({ children }: Readonly<PropsWithChildren<IProps>>) {
  const { lock, logout } = useShortcuts();
  useKeyPress(lock.keyFilter, () => lock.cb(false), { exactMatch: true });
  useKeyPress(logout.keyFilter, () => logout.cb(false), { exactMatch: true });
  return children;
}
