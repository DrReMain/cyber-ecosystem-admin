'use client';

import type { PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';

import useRequest from '@/hooks/use-request';
import { accountInfo } from '@/services/clients/accountService/accountInfo';

interface IProps {
}

export default function Container({ children }: Readonly<PropsWithChildren<IProps>>) {
  const { queryHOF } = useRequest();
  const _queryInfo = useQuery({
    queryKey: [accountInfo.name],
    queryFn: ctx => queryHOF(accountInfo)({ signal: ctx.signal }),
  });

  return (
    <>
      {children}
    </>
  );
}
