import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';

import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Href = Parameters<typeof getPathname>[0]['href'];

function getURL(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
}

function getEntries(
  href: Href,
  lastModified: MetadataRoute.Sitemap[number]['lastModified'],
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: MetadataRoute.Sitemap[number]['priority'],
): MetadataRoute.Sitemap {
  return routing.locales.map(locale => ({
    url: getURL(href, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map(cur => [cur, getURL(href, cur)]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...getEntries('/', new Date(), 'never', 1),
  ];
}
