import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { isLanguage } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { notFound } from 'next/navigation';
export default async function Layout({ children, params }: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const t = getMessages(lang);
  return <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang)} sidebar={{ footer: <div className="sidebar-note"><span className="status-dot" />{t.sidebarNote}</div> }}>{children}</DocsLayout>;
}
