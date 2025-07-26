import type { Locale } from 'next-intl';

import { useParams } from 'next/navigation';
import { startTransition, useMemo } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function useLang() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const locales = useMemo(() =>
    routing.locales.map(l => ({ origin: l, underscore: l.replace('-', '_') })), []);

  return {
    locales,
    submit: (locale: Locale) => {
      startTransition(() => {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        router.replace({ pathname, params }, { locale });
      });
    },
  };
}
