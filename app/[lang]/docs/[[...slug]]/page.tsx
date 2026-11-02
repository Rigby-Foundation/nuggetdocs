import { source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle, MarkdownCopyButton } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageImageUrl, getPageMarkdownUrl } from '@/lib/shared';
import { isLanguage, languages, languageTag } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';

export default async function Page(props: PageProps<'/[lang]/docs/[[...slug]]'>) {
  const { lang, slug } = await props.params;
  if (!isLanguage(lang)) notFound();
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const MDX = page.data.body;
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="doc-tools"><span>{getMessages(lang).docLabel}</span><MarkdownCopyButton markdownUrl={getPageMarkdownUrl(page).url} /></div>
      <DocsBody><MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} /></DocsBody>
    </DocsPage>
  );
}
export function generateStaticParams() { return source.generateParams(); }
export async function generateMetadata(props: PageProps<'/[lang]/docs/[[...slug]]'>): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!isLanguage(lang)) notFound();
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  return {
    title: page.data.title, description: page.data.description,
    openGraph: { images: getPageImageUrl(page).url, locale: languageTag(lang), alternateLocale: languages.filter((l) => l !== lang).map(languageTag) },
    alternates: { canonical: page.url, languages: Object.fromEntries(languages.map((l) => [languageTag(l), source.getPage(slug, l)?.url])) },
  };
}
