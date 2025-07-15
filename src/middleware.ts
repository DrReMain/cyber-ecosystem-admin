import type { NextFetchEvent, NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

const handleI18NRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest, _ev: NextFetchEvent) {
  return handleI18NRouting(req);
}

export const config = {
  matcher: [
    '/((?!api|graphql|trpc|_vercel|_next|.*\\..*).*)',
  ],
};
