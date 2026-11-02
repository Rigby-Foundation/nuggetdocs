import { defineI18n } from 'fumadocs-core/i18n';

export const languages = ['en', 'ru', 'uk', 'zh', 'ja', 'fa'] as const;
export type Language = (typeof languages)[number];
export const languageNames: Record<Language, string> = {
  en: 'English', ru: 'Русский', uk: 'Українська', zh: '中文', ja: '日本語', fa: 'فارسی',
};
export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: [...languages],
  hideLocale: 'never',
  parser: 'dir',
  fallbackLanguage: null,
});
export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}
export function languageTag(lang: Language) { return lang === 'zh' ? 'zh-CN' : lang; }
export function direction(lang: Language) { return lang === 'fa' ? 'rtl' : 'ltr'; }
export function localize(lang: Language, path: string = '/') {
  return `/${lang}${path === '/' ? '' : path}`;
}
