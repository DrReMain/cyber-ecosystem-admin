import type { Locale } from 'next-intl';

import arEG from 'antd/es/locale/ar_EG';
// import enUS from 'antd/es/locale/en_US';
// import jaJP from 'antd/es/locale/ja_JP';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export default function useI18n(locale: Locale) {
  return useMemo(() => {
    switch (locale) {
      // case 'en-US':
      //   dayjs.locale('en');
      //   return enUS;
      // case 'ja-JP':
      //   dayjs.locale('ja');
      //   return jaJP;
      case 'ar-EG':
        dayjs.locale('ar');
        return arEG;

        // DEFAULT
      case 'zh-CN':
      default:
        dayjs.locale('zh-cn');
        return zhCN;
    }
  }, [locale]);
}
