import type { Locale } from 'next-intl';

import {
  Noto_Naskh_Arabic,
  Noto_Sans,
  Noto_Sans_Devanagari,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Thai,
} from 'next/font/google';

export const notoLatin = Noto_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-latin' });

export const notoSC = Noto_Sans_SC({ subsets: ['latin'], display: 'swap', variable: '--font-sc' });

export const notoTC = Noto_Sans_TC({ subsets: ['latin'], display: 'swap', variable: '--font-tc' });

export const notoJP = Noto_Sans_JP({ subsets: ['latin'], display: 'swap', variable: '--font-jp' });

export const notoKR = Noto_Sans_KR({ subsets: ['latin'], display: 'swap', variable: '--font-kr' });

export const notoAR = Noto_Naskh_Arabic({ subsets: ['latin'], display: 'swap', variable: '--font-ar' });

export const notoHI = Noto_Sans_Devanagari({ subsets: ['latin'], display: 'swap', variable: '--font-hi' });

export const notoTH = Noto_Sans_Thai({ subsets: ['latin'], display: 'swap', variable: '--font-th' });

export function getFontClass(locale: Locale) {
  const [language, region] = locale?.split('-') ?? [];
  const lang = language?.toLowerCase();

  return {
    zh: region?.toLowerCase() === 'tw' ? 'font-tc' : 'font-sc',
    ja: 'font-jp',
    ko: 'font-kr',
    ar: 'font-ar',
    hi: 'font-hi',
    th: 'font-th',
  }[lang ?? ''] || 'font-latin';
}
