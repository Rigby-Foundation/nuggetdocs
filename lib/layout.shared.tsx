import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { localize, type Language } from './i18n';
import { getMessages } from './messages';

export function baseOptions(lang: Language): BaseLayoutProps {
  const t = getMessages(lang);
  return {
    nav: {
      title: <span className="brand"><img src="/nugget.svg" alt="" width="31" height="31" /><span>NuggetVPN<span className="brand-dot">.</span></span><span className="brand-docs">{t.docs}</span></span>,
      url: localize(lang),
    },
    links: [
      { text: t.guides, url: localize(lang, '/docs'), active: 'nested-url' },
      { text: t.pluginSdk, url: localize(lang, '/docs/plugins'), active: 'nested-url' },
      { text: t.download, url: 'https://github.com/Rigby-Foundation/NuggetVPN/releases', external: true },
    ],
    githubUrl: 'https://github.com/Rigby-Foundation/NuggetVPN',
  };
}
