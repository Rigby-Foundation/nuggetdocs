
'use client';

import { useEffect } from 'react';

const supportedLanguages = [
  'en',
  'ru',
  'uk',
  'zh',
  'ja',
  'fa',
];

export default function HomePage() {
  useEffect(() => {
    const languages = navigator.languages ?? [
      navigator.language,
    ];

    const preferred = languages
      .map((lang) => lang.split('-')[0].toLowerCase())
      .find((lang) => supportedLanguages.includes(lang));

    const locale = preferred ?? 'en';

    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <main className='dark'>
      <p>
        Redirecting to documentation...
        {' '}
        <a href="/en/">Continue to documentation</a>
      </p>
    </main>
  );
}
