'use client';

import type { PropsWithChildren } from 'react';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface IProps {
}

export default function Left(_props: Readonly<PropsWithChildren<IProps>>) {
  const t = useTranslations('login.page');
  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-64 h-64"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <Image src="/images/login.svg" alt="cyber ecosystem" priority fill sizes="256px" className="object-contain" />
      </motion.div>

      <div className="flex flex-col items-center gap-2 font-sans">
        <h2 className="font-bold text-3xl">{t('h1')}</h2>
        <p className="text-sm text-gray-500">{t('sub')}</p>
      </div>
    </motion.div>
  );
}
