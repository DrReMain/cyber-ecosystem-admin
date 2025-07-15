import { createNavigation } from 'next-intl/navigation';

import { routing } from '@/i18n/routing';

export const { getPathname, redirect, Link, usePathname, useRouter } = createNavigation(routing);
