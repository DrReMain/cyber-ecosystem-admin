'use client';

import type { MenuProps } from 'antd';

import { Menu } from 'antd';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { accountInfo } from '@/services/clients/accountService/accountInfo';

import DynLucide from '@/components/base/dyn-lucide.client';
import { P } from '@/lib/constant/pages';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { atom_setting } from '@/store/setting/store';

enum EMenuType {
  DIVIDER = 'divider',
  GROUP = 'group',
  MENU = 'menu',
  PAGE = 'page',
}

interface IProps {
  menus?: Awaited<ReturnType<typeof accountInfo>>['data']['result']['menus'];
}

export default function Menus({ menus }: Readonly<IProps>) {
  const t = useTranslations('menus');
  const setting = useAtomValue(atom_setting);
  const pathname = usePathname();

  const transformMenusToItems = useCallback((ms: NonNullable<typeof menus>): MenuProps['items'] => {
    return ms.map(({ code_path, icon, menu_type, children }) => {
      const meta = P[code_path as keyof typeof P] as typeof P[keyof typeof P] | undefined;

      const label = meta?.i18n
        ? t.has(meta.i18n) ? t(meta.i18n) : meta.i18n
        : 'unknown';

      const hasChildren = Array.isArray(children) && children.length > 0;

      if (menu_type === EMenuType.DIVIDER) {
        return { type: 'divider' };
      }

      if (menu_type === EMenuType.GROUP) {
        return {
          type: 'group',
          label,
          children: hasChildren ? transformMenusToItems(children) : undefined,
        };
      }

      if (menu_type === EMenuType.MENU) {
        return {
          key: code_path,
          label: hasChildren || !meta?.path ? label : <Link href={meta.path} prefetch>{label}</Link>,
          ...(icon && { icon: <DynLucide title={icon} size={16} /> }),
          children: hasChildren ? transformMenusToItems(children) : undefined,
        };
      }

      return null;
    });
  }, [t]);
  const items = useMemo<MenuProps['items']>(() => {
    return menus ? transformMenusToItems(menus) : [];
  }, [menus, transformMenusToItems]);

  const findMatchingMenuKey = useCallback((
    ms: NonNullable<typeof menus>,
    currentPath: string,
  ): string | null => {
    for (const { code_path, menu_type, children } of ms) {
      if (menu_type === EMenuType.GROUP || menu_type === EMenuType.MENU) {
        const meta = P[code_path as keyof typeof P] as typeof P[keyof typeof P] | undefined;
        if (meta?.path && currentPath === meta.path) {
          return code_path;
        }
        if (Array.isArray(children) && children.length > 0) {
          const childMatch = findMatchingMenuKey(children, currentPath);
          if (childMatch) {
            return childMatch;
          }
        }
      }
    }

    return null;
  }, []);

  const selectedKeys = useMemo(() => {
    if (!menus)
      return [];
    const matchedKey = findMatchingMenuKey(menus, pathname);
    return matchedKey ? [matchedKey] : [];
  }, [menus, pathname, findMatchingMenuKey]);

  const findMenuPath = useCallback((
    ms: NonNullable<typeof menus>,
    targetKey: string,
    currentPath: string[] = [],
  ): string[] | null => {
    for (const { code_path, menu_type, children } of ms) {
      if (menu_type === EMenuType.GROUP || menu_type === EMenuType.MENU) {
        const newPath = [...currentPath, code_path];
        if (code_path === targetKey) {
          return newPath.slice(0, -1);
        }
        if (Array.isArray(children) && children.length > 0) {
          const childPath = findMenuPath(children, targetKey, newPath);
          if (childPath)
            return childPath;
        }
      }
    }
    return null;
  }, []);

  const getInitialOpenKeys = useCallback(() => {
    if (!menus || selectedKeys.length === 0)
      return [];
    return findMenuPath(menus, selectedKeys[0]) || [];
  }, [menus, selectedKeys, findMenuPath]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    if (setting.foldMenu)
      return;

    const initialOpenKeys = getInitialOpenKeys();

    if (setting.accordionMenu) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setOpenKeys(initialOpenKeys);
    }
    else {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setOpenKeys(prevState => ([...new Set([...prevState, ...initialOpenKeys])]));
    }
  }, [selectedKeys, setting.accordionMenu, setting.foldMenu, getInitialOpenKeys]);

  const onOpenChange = useCallback((keys: string[]) => {
    if (setting.foldMenu)
      return;
    if (setting.accordionMenu) {
      const latestOpenKey = keys.find(key => !openKeys.includes(key));
      const latestCloseKey = openKeys.find(key => !keys.includes(key));
      if (latestOpenKey) {
        const newPath = findMenuPath(menus || [], latestOpenKey) || [];
        setOpenKeys([...newPath, latestOpenKey]);
      }
      else if (latestCloseKey) {
        setOpenKeys(keys);
      }
    }
    else {
      setOpenKeys(keys);
    }
  }, [setting.foldMenu, setting.accordionMenu, openKeys, menus, findMenuPath]);

  const menuProps = useMemo(() => {
    const baseProps = {
      style: {
        backgroundColor: 'transparent',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        width: '100%',
        height: '100%',
      },
      mode: 'inline' as const,
      items,
      selectedKeys,
    };

    if (setting.foldMenu) {
      return {
        ...baseProps,
        inlineCollapsed: true,
      };
    }
    else {
      return {
        ...baseProps,
        openKeys,
        onOpenChange,
      };
    }
  }, [items, selectedKeys, setting.foldMenu, openKeys, onOpenChange]);

  return (
    <Menu {...menuProps} />
  );
}
