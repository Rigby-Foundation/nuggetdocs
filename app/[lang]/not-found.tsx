'use client';
import Link from 'next/link';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { isLanguage, localize } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
export default function NotFound() {
  const { locale } = useI18n();
  const lang = locale && isLanguage(locale) ? locale : 'en';
  const t = getMessages(lang);
  return <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-5 px-6 text-center"><p className="text-fd-muted-foreground">404</p><h1 className="text-3xl font-semibold">{t.notFoundTitle}</h1><p className="text-fd-muted-foreground">{t.notFoundDescription}</p><Link href={localize(lang)} className="primary-link">{t.backHome}</Link></main>;
}
