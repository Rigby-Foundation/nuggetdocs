import type { Metadata } from 'next';
import { DocsProvider } from '@/components/providers';
import { notFound } from 'next/navigation';
import { direction, isLanguage, languages, languageTag } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { providerTranslations } from '@/lib/translations';
import '@fontsource-variable/onest';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/vazirmatn';
import '../global.css';

export const dynamicParams = false;
export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const t = getMessages(lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: { default: t.siteTitle, template: '%s · NuggetVPN' },
    description: t.siteDescription,
    applicationName: 'NuggetVPN Docs',
    icons: { icon: '/icon.png' },
    alternates: { canonical: `/${lang}`, languages: Object.fromEntries(languages.map((l) => [languageTag(l), `/${l}`])) },
  };
}
export default async function Layout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return (
    <html lang={languageTag(lang)} dir={direction(lang)} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <DocsProvider dir={direction(lang)} i18n={providerTranslations(lang)} theme={{ defaultTheme: 'dark' }}>{children}</DocsProvider>
      </body>
    </html>
  );
}
