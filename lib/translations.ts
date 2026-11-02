import { i18nProvider, uiTranslations, type Translations } from 'fumadocs-ui/i18n';
import { zhCN } from '@fumadocs/language/zh-cn';
import { i18n, type Language } from './i18n';
import ru from './locales/ui.ru.json';
import uk from './locales/ui.uk.json';
import ja from './locales/ui.ja.json';
import fa from './locales/ui.fa.json';

const ui: Record<'ru' | 'uk' | 'ja' | 'fa', Translations> = { ru, uk, ja, fa };
export const translations = i18n.translations().extend(uiTranslations())
  .preset('zh', zhCN())
  .add({ en: { displayName: 'English' }, ...ui });
export function providerTranslations(lang: Language) {
  return i18nProvider(translations, lang);
}
