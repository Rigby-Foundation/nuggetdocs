import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred } from 'fumadocs-core/negotiation';
import { isLanguage } from '@/lib/i18n';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];
  if (!locale || !isLanguage(locale)) {
    // Preserve existing English bookmarks and the original unprefixed URLs.
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url, 308);
  }
  if (segments[1] === 'docs' && (pathname.endsWith('.md') || isMarkdownPreferred(request))) {
    const slug = segments.slice(2).join('/').replace(/\.md$/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/llms.mdx/docs/${slug ? `${slug}/` : ''}content.md`;
    return NextResponse.rewrite(url, { headers: { Vary: 'Accept' } });
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((?!api(?:/|$)|og(?:/|$)|_next(?:/|$)|icon\\.png$|nugget\\.svg$|favicon\\.ico$).*)'] };
