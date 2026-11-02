import { docsLlms } from '@/lib/source';
import { isLanguage, languages } from '@/lib/i18n';
import { notFound } from 'next/navigation';
export const revalidate = false;
export async function GET(_request: Request, { params }: RouteContext<'/[lang]/llms.txt'>) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return new Response(await docsLlms.index(lang), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
export function generateStaticParams() { return languages.map((lang) => ({ lang })); }
