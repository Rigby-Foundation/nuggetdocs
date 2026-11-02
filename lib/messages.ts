import en from './locales/en.json';
import ru from './locales/ru.json';
import uk from './locales/uk.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import fa from './locales/fa.json';
import type { Language } from './i18n';
export type Messages = { [K in keyof typeof en]: string };
const messages: Record<Language, Messages> = { en, ru, uk, zh, ja, fa };
export function getMessages(lang: Language): Messages { return messages[lang]; }
