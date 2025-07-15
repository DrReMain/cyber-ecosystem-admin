import '@/styles/globals.css';

import type { Viewport } from 'next';
import type { Locale } from 'next-intl';
import type { PropsWithChildren } from 'react';

import clsx from 'clsx';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getLangDir } from 'rtl-detect';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

interface IProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata(props: Readonly<IProps>) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'app' });
  return {
    title: {
      default: t('title'),
      template: t('template'),
    },
    description: t('description'),
    applicationName: t('applicationName'),
    keywords: t('keywords'),
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function I18NLayout({ children, params }: Readonly<PropsWithChildren<IProps>>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale))
    notFound();
  setRequestLocale(locale);
  return (
    <html lang={locale} dir={getLangDir(locale)} suppressHydrationWarning>
      <body className={clsx('antialiased', GeistSans.variable, GeistMono.variable)}>
        {children}
      </body>
      {/* <Script async src="" /> */}
    </html>
  );
}
