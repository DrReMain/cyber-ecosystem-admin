'use client';

import type { LucideProps } from 'lucide-react';

import { Loader, Square } from 'lucide-react';
import dynamic from 'next/dynamic';

import { LucideIconNames } from '@/lib/constant/lucide';

const validIconNames = new Set(LucideIconNames);

interface IProps extends LucideProps {
  title: string;
}

export default function DynLucide({ title, ...props }: Readonly<IProps>) {
  const isValid = validIconNames.has(title);
  const Icon = dynamic(
    () =>
      import('lucide-react').then((mod) => {
        const IconComponent = isValid ? (mod as any)[title] : null;
        return { default: IconComponent ?? Square };
      }),
    {
      ssr: false,
      loading: () => <Loader {...props} />,
    },
  );
  return <Icon {...props} />;
}
