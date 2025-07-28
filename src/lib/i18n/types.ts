import type messages from '@messages/@target/zh-CN.json';

import type { routing } from '@/lib/i18n/routing';

declare module 'next-intl' {

  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
