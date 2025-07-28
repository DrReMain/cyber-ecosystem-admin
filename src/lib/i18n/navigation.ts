import { createNavigation } from 'next-intl/navigation';

import { routing } from '@/lib/i18n/routing';

export const { getPathname, redirect, Link, usePathname, useRouter } = createNavigation(routing);
