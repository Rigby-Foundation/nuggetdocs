import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import Slugger from 'github-slugger';

const root = path.resolve('content/docs');
const languages = ['en', 'ru', 'uk', 'zh', 'ja', 'fa'];
const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);
const fail = [];
async function filesIn(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(async (entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  }))).flat();
}
function normalizedUrl(url) { return url.replace(/^\/(en|ru|uk|zh|ja|fa)\/docs/, '/docs'); }
function inspect(text, lang, file) {
  if (/[⟦⟧⟪⟫]|ZXQ\d+QXZ/.test(text)) fail.push(`${lang}/${file}: translation placeholder remains`);
  const body = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  const tree = parser.parse(body);
  const data = { code: [], inlineCode: [], headings: [], tables: [], links: [], components: [], strong: 0 };
  const slugger = new Slugger();
  const flat = (n) => n.value ?? n.children?.map(flat).join('') ?? '';
  function visit(node) {
    if (node.type === 'code') data.code.push(`${node.lang}\n${node.value}`);
    if (node.type === 'inlineCode') data.inlineCode.push(node.value);
    if (node.type === 'strong') data.strong++;
    if (node.type === 'heading') {
      const value = flat(node);
      const customId = /\s*\[#([^]+?)]\s*$/.exec(value)?.[1];
      data.headings.push([node.depth, customId ?? slugger.slug(value)]);
    }
    if (node.type === 'table') data.tables.push(node.children.map((row) => row.children.length));
    if (node.type === 'link') {
      data.links.push(normalizedUrl(node.url));
      if (!flat(node).trim()) fail.push(`${lang}/${file}: empty link ${node.url}`);
      if (node.url.startsWith('/') && !node.url.startsWith(`/${lang}/`)) fail.push(`${lang}/${file}: link leaves locale: ${node.url}`);
    }
    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      data.components.push(node.name);
      for (const attr of node.attributes ?? []) {
        if (attr.name === 'href' && typeof attr.value === 'string') {
          data.links.push(normalizedUrl(attr.value));
          if (attr.value.startsWith('/') && !attr.value.startsWith(`/${lang}/`)) fail.push(`${lang}/${file}: card leaves locale: ${attr.value}`);
        }
      }
    }
    for (const child of node.children ?? []) visit(child);
  }
  visit(tree);
  data.inlineCode.sort(); data.links.sort();
  return data;
}
const expected = (await filesIn(path.join(root, 'en'))).filter((f) => f.endsWith('.mdx')).map((f) => path.relative(path.join(root, 'en'), f));
const english = new Map();
for (const file of expected) english.set(file, inspect(await readFile(path.join(root, 'en', file), 'utf8'), 'en', file));
for (const lang of languages) {
  const actual = (await filesIn(path.join(root, lang))).filter((f) => f.endsWith('.mdx')).map((f) => path.relative(path.join(root, lang), f));
  if (JSON.stringify([...actual].sort()) !== JSON.stringify([...expected].sort())) fail.push(`${lang}: page coverage differs from English (${actual.length}/${expected.length})`);
  for (const file of expected) {
    if (!actual.includes(file)) continue;
    try {
      const text = await readFile(path.join(root, lang, file), 'utf8');
      const result = inspect(text, lang, file);
      for (const key of Object.keys(result)) if (JSON.stringify(result[key]) !== JSON.stringify(english.get(file)[key])) fail.push(`${lang}/${file}: ${key} differ from English`);
    } catch (error) { fail.push(`${lang}/${file}: ${error.message}`); }
  }
  const messages = JSON.parse(await readFile(`lib/locales/${lang}.json`, 'utf8'));
  const en = JSON.parse(await readFile('lib/locales/en.json', 'utf8'));
  if (JSON.stringify(Object.keys(messages).sort()) !== JSON.stringify(Object.keys(en).sort())) fail.push(`${lang}: site message keys differ`);
}
if (fail.length) { console.error([...new Set(fail)].join('\n')); process.exitCode = 1; }
else console.log(`Verified ${expected.length} pages × ${languages.length} languages: coverage, MDX structure, code examples, links, heading anchors, and site messages.`);
