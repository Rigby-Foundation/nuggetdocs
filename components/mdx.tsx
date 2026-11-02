import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Cards, Card } from 'fumadocs-ui/components/card';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { Callout } from 'fumadocs-ui/components/callout';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return { ...defaultMdxComponents, Cards, Card, Steps, Step, Tabs, Tab, Callout, ...components } satisfies MDXComponents;
}
export const useMDXComponents = getMDXComponents;
declare global { type MDXProvidedComponents = ReturnType<typeof getMDXComponents>; }
