import { useLocale } from 'next-intl';
import { getLangDir } from 'rtl-detect';

export default function useRTL() {
  const locale = useLocale();

  return getLangDir(locale) === 'rtl';
}
