import type { Locale } from 'next-intl';

import { getTranslations } from 'next-intl/server';

import Container from '@/features/login/container.client';
import Form from '@/features/login/form.client';
import Left from '@/features/login/left.client';
import Logo from '@/features/login/logo';
import Right from '@/features/login/right.client';
import Setting from '@/features/login/setting.client';

export async function generateMetadata({ params }: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'login.meta' });
  return {
    title: t('title'),
    description: '',
  };
}

export default async function Page() {
  return (
    <Container
      logo={<Logo />}
      setting={<Setting />}
      left={<Left />}
      right={(
        <Right>
          <Form />
        </Right>
      )}
    />
  );
}
