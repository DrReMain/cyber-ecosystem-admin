import type { Locale } from 'next-intl';

import { getTranslations } from 'next-intl/server';

import Config from '@/app/[locale]/(admin)/(public)/(pages)/login/_modules/config.client';
import Container from '@/app/[locale]/(admin)/(public)/(pages)/login/_modules/container.client';
import Form from '@/app/[locale]/(admin)/(public)/(pages)/login/_modules/form.client';
import Left from '@/app/[locale]/(admin)/(public)/(pages)/login/_modules/left.client';
import Logo from '@/app/[locale]/(admin)/(public)/(pages)/login/_modules/logo';
import Right from '@/app/[locale]/(admin)/(public)/(pages)/login/_modules/right.client';
import Guard from '@/app/[locale]/(admin)/_module/guard';

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
    <Guard auth={false}>
      <Container
        logo={<Logo />}
        left={<Left />}
        config={<Config />}
        right={(
          <Right>
            <Form />
          </Right>
        )}
      />
    </Guard>
  );
}
