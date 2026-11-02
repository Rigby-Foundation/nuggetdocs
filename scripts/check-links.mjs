import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('content/docs');
async function filesIn(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(async (entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  }))).flat();
}
const files = (await filesIn(root)).filter((file) => file.endsWith('.mdx'));
const routes = new Map(files.map((file) => {
  const [lang, ...parts] = path.relative(root, file).replaceAll(path.sep, '/').split('/');
  const slug = parts.join('/').replace(/\.mdx$/, '').replace(/(^|\/)index$/, '');
  return [`/${lang}/docs${slug ? `/${slug}` : ''}`, file];
}));
let errors = 0;
let checked = 0;
for (const file of files) {
  const text = (await readFile(file, 'utf8')).replace(/^```[^\n]*\n[\s\S]*?^```/gm, '');
  const links = [...text.matchAll(/\]\((\/(?:en|ru|uk|zh|ja|fa)\/docs[^)\s]*)\)|href=["'](\/(?:en|ru|uk|zh|ja|fa)\/docs[^"']*)["']/g)];
  for (const match of links) {
    const url = match[1] ?? match[2];
    const route = url.split(/[?#]/)[0].replace(/\/$/, '');
    checked++;
    if (!routes.has(route)) { console.error(`${path.relative(root, file)}: missing route ${url}`); errors++; }
  }
}
if (errors) process.exitCode = 1;
else console.log(`Checked ${checked} documentation links across ${files.length} pages.`);
