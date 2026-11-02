import { i18n } from './i18n';
import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'NuggetVPN';
export const docsRoute = '/docs';
export const docsContentRoute = '/llms.mdx/docs';

const getContentUrl = createGetUrl(docsContentRoute, i18n);
export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];
  return { segments, url: getContentUrl(segments, page.locale) };
}
export function getPageImageUrl(_page: { slugs: string[]; locale?: string }) {
  return { segments: ['image.png'], url: '/og/image.png' };
}
