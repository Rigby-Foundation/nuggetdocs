import { docsLlms, source } from '@/lib/source';
import { getPageMarkdownUrl } from '@/lib/shared';
import { notFound } from 'next/navigation';
import { isLanguage } from '@/lib/i18n';
export const revalidate = false;
export async function GET(_req: Request, { params }: RouteContext<'/[lang]/llms.mdx/docs/[[...slug]]'>) {
  const { slug, lang } = await params;
  if (!isLanguage(lang)) notFound();
  const page = source.getPage(slug?.slice(0, -1), lang);
  if (!page) notFound();
  return new Response(await docsLlms.page(page), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
export function generateStaticParams() {
  return source.getPages().map((page) => ({ lang: page.locale, slug: getPageMarkdownUrl(page).segments }));
}
