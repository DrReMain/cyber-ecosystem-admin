'use client';

import type { PropsWithChildren } from 'react';

import { motion } from 'motion/react';

interface IProps {
}

export default function Right({ children }: Readonly<PropsWithChildren<IProps>>) {
  return (
    <motion.div
      className="h-full flex items-center justify-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
