import type { MouseEvent as ReactMouseEvent } from 'react';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

import { setCookieAction } from '@/server-actions/cookie.actions';

export default function useMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  const toggle = useCallback((e: ReactMouseEvent<Element, MouseEvent>, t: string) => {
    if (!resolvedTheme)
      return;

    const isDark = resolvedTheme === 'dark';
    const applyTheme = () => {
      void setCookieAction('theme', t);
      setTheme(t);
    };

    const isAppearanceTransition
          // eslint-disable-next-line ts/ban-ts-comment
          // @ts-expect-error
          = document.startViewTransition
            && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isAppearanceTransition || resolvedTheme === t)
      return applyTheme();

    const [x, y] = [e.nativeEvent.x, e.nativeEvent.y];
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    document.startViewTransition(() => {
      applyTheme();
    }).ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: !isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: !isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      );
    });
  }, [resolvedTheme, setTheme]);

  return {
    resolvedTheme: isReady ? resolvedTheme : undefined,
    toggle,
    isReady,
  };
}
