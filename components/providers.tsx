
'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ComponentProps } from 'react';
import { isLanguage } from '@/lib/i18n';
import StaticSearchDialog from '@/components/search';

type Props = ComponentProps<typeof RootProvider>;

export function DocsProvider({ i18n, search, ...props }: Props) {
  return (
    <RootProvider
      {...props}
      search={{
        ...search,
        SearchDialog: StaticSearchDialog,
      }}
      i18n={{
        ...i18n,
        onLocaleChange(next) {
          if (!isLanguage(next)) return;

          const url = new URL(window.location.href);
          url.pathname = url.pathname.replace(
            /^\/(en|ru|uk|zh|ja|fa)(?=\/|$)/,
            `/${next}`,
          );

          // Locale layouts own <html lang/dir> and
          // the theme initialization script.
          window.location.assign(url.href);
        },
      }}
    />
  );
}
