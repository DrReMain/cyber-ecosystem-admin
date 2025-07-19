import type { Locale } from 'next-intl';

import { useParams } from 'next/navigation';
import { startTransition, useMemo } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function useLang() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const locales = useMemo(() => {
    return routing.locales.map(_ => ({
      origin: _,
      underscore: _.replace('-', '_'),
    }));
  }, []);

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
