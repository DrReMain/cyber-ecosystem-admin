'use client';

import type { LucideProps } from 'lucide-react';

import { Loader, Square } from 'lucide-react';
import dynamic from 'next/dynamic';

import { LucideIconSet } from '@/lib/constant/lucide';

interface IProps extends LucideProps {
  title: string;
}

export default function DynLucide({ title, ...props }: Readonly<IProps>) {
  const isValid = LucideIconSet.has(title);
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
