import { useEffect } from 'react';

export interface ShortcutOptions {
  code: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  handler: (event: KeyboardEvent) => void;
}

export function useShortcuts(enabled: boolean, shortcuts: ShortcutOptions[]) {
  useEffect(() => {
    if (!enabled)
      return;

    const handler = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const {
          code,
          altKey = false,
          ctrlKey = false,
          metaKey = false,
          shiftKey = false,
          handler,
        } = shortcut;

        const match
            = event.code === code
              && event.altKey === altKey
              && event.ctrlKey === ctrlKey
              && event.metaKey === metaKey
              && event.shiftKey === shiftKey;

        if (match) {
          event.preventDefault();
          handler(event);
          break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, shortcuts]);
}
