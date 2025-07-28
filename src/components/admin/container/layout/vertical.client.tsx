'use client';

import type { PropsWithChildren, ReactNode } from 'react';

import { Button } from 'antd';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { ArrowLeftFromLine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import useRTL from '@/lib/hooks/use-rtl';
import { atom_setting } from '@/store/setting/store';

interface IProps {
  asideTop?: ReactNode;
  asideMiddle?: ReactNode;
}

const SCROLL_THRESHOLD = 5;

export default function Vertical({
  children,
  asideTop,
  asideMiddle,
}: Readonly<PropsWithChildren<IProps>>) {
  const isRTL = useRTL();
  const [setting, setSetting] = useAtom(atom_setting);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const [scrollState, setScrollState] = useState({
    showTopShadow: false,
    showBottomShadow: false,
    hasScrollbar: false,
  });

  const asideWidth = !setting.showAside
    ? 0
    : setting.foldMenu
      ? 48
      : setting.asideWidth;

  const asideStyle = {
    flex: `0 0 ${asideWidth}px`,
    width: asideWidth,
    maxWidth: asideWidth,
  };

  const checkScrollState = () => {
    const el = scrollRef.current;
    if (!el)
      return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const hasScroll = scrollHeight > clientHeight;

    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setScrollState({
      hasScrollbar: hasScroll,
      showTopShadow: hasScroll && scrollTop > SCROLL_THRESHOLD,
      showBottomShadow:
          hasScroll && scrollTop + clientHeight < scrollHeight - SCROLL_THRESHOLD,
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el)
      return;

    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(checkScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', checkScrollState);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkScrollState, 100);
    return () => clearTimeout(timer);
  }, [asideMiddle]);

  useEffect(() => {
    const target = scrollContentRef.current;
    if (!target)
      return;

    const observer = new MutationObserver(() => {
      checkScrollState();
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [asideMiddle]);

  const toggleFoldMenu = () => {
    setSetting(prev => ({ ...prev, foldMenu: !prev.foldMenu }));
  };

  const renderShadow = (type: 'top' | 'bottom', show: boolean) => {
    if (!show)
      return null;

    return (
      <div
        className={clsx(
          'pointer-events-none absolute start-0 end-0 z-20',
          'from-black/5 dark:from-black/20 to-transparent',
          type === 'top' ? 'top-0 bg-gradient-to-b' : 'bottom-0 bg-gradient-to-t',
        )}
        style={{ height: 21 }}
      />
    );
  };

  return (
    <div className="relative min-h-screen w-full flex">
      <section className="h-0 transition-all duration-200" style={asideStyle} />

      <aside
        className="fixed start-0 top-0 bottom-0 overflow-hidden transition-all duration-200 border-e border-[#0505050f] dark:border-[#fdfdfd1f]"
        style={{ ...asideStyle, zIndex: 10 }}
      >
        <div className="w-full h-full flex flex-col">
          {asideTop && <div className="flex-none">{asideTop}</div>}

          <div className="h-0 flex-1 relative">
            <div
              ref={scrollRef}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
            >
              <div ref={scrollContentRef} className="min-h-full">
                {asideMiddle}
              </div>
            </div>
            {renderShadow('top', scrollState.showTopShadow)}
            {renderShadow('bottom', scrollState.showBottomShadow)}
          </div>

          <div
            className={clsx(
              'h-10 flex-none p-2 flex items-center border-t border-[#0505050f] dark:border-[#fdfdfd1f]',
              setting.foldMenu ? 'justify-center' : 'justify-start',
            )}
          >
            <Button
              size="small"
              color="default"
              variant="filled"
              icon={(
                <ArrowLeftFromLine
                  size={12}
                  className={clsx(
                    'transform transition-transform duration-200',
                    (isRTL ? !setting.foldMenu : setting.foldMenu) && 'rotate-180',
                  )}
                />
              )}
              onClick={toggleFoldMenu}
            />
          </div>
        </div>
      </aside>

      <section className="flex-1 min-h-screen">{children}</section>
    </div>
  );
}
