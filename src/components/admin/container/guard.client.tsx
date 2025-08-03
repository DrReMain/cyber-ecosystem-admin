'use client';

import type { PropsWithChildren } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useLocale } from 'next-intl';
import { useEffect, useMemo } from 'react';

import { P } from '@/lib/constant/pages';
import { redirect, usePathname } from '@/lib/i18n/navigation';
import { accountInfo } from '@/services/clients/accountService/accountInfo';
import { atom_global } from '@/store/global/store';

interface IProps {
}

const pages = Object.entries(P);

export default function Guard({ children }: Readonly<PropsWithChildren<IProps>>) {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Awaited<ReturnType<typeof accountInfo>>>([accountInfo.name]);
  const menus = data?.data.result.menus;

  const locale = useLocale();
  const pathname = usePathname();
  const [, setGlobal] = useAtom(atom_global);

  const currentCodePath = useMemo(() => pages.find(([_, { path }]) => path === pathname), [pathname])?.[0] || null;
  const allowedCodePaths = useMemo(() => {
    if (!menus)
      return new Set<string>();
    const flattenMenu = (menuItems: NonNullable<typeof menus>): string[] => {
      return menuItems.flatMap(({ code_path, children }) => {
        const result = [code_path];
        if (Array.isArray(children) && children.length > 0) {
          result.push(...flattenMenu(children));
        }
        return result;
      });
    };
    return new Set(flattenMenu(menus));
  }, [menus]);
  const getFirstValidPage = useMemo(() => {
    if (!menus)
      return null;
    const findFirstValidPage = (menuItems: NonNullable<typeof menus>): string | null => {
      for (const { code_path, children } of menuItems) {
        const meta = P[code_path as keyof typeof P] as typeof P[keyof typeof P] | undefined;
        if (meta?.path)
          return meta.path;

        if (Array.isArray(children) && children.length > 0) {
          const result = findFirstValidPage(children);
          if (result)
            return result;
        }
      }
      return null;
    };
    return findFirstValidPage(menus);
  }, [menus]);
  const hasPermission = useMemo(() => {
    if (!currentCodePath) {
      return false;
    }
    return allowedCodePaths.has(currentCodePath);
  }, [currentCodePath, allowedCodePaths]);

  useEffect(() => {
    setGlobal((g) => {
      g.menus = allowedCodePaths;
    });
  }, [allowedCodePaths]); // eslint-disable-line react-hooks/exhaustive-deps

  if (pathname === P.HOME.path) {
    if (getFirstValidPage)
      redirect({ href: getFirstValidPage, locale });
  }

  if (!hasPermission) {
    throw new Error('403');
  }

  return children;
}
