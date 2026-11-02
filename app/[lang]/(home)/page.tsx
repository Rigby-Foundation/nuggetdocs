import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, BookOpen, Cable, Check, Code2, Download, Globe2, Laptop, Network, Puzzle, ShieldCheck, Terminal, Wrench } from 'lucide-react';
import { getMessages } from '@/lib/messages';
import { isLanguage, localize } from '@/lib/i18n';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const t = getMessages(lang);
  const href = (path: string) => localize(lang, path);
  const guides = [
    { icon: Download, title: t.installTitle, description: t.installDescription, href: href('/docs/getting-started/installation'), label: t.installLabel },
    { icon: Cable, title: t.connectTitle, description: t.connectDescription, href: href('/docs/getting-started/first-connection'), label: t.connectLabel },
    { icon: Network, title: t.routingTitle, description: t.routingDescription, href: href('/docs/guides/routing'), label: t.routingLabel },
  ];
  const explore = [
    { icon: ShieldCheck, title: t.coreTitle, description: t.coreDescription, href: href('/docs/reference/cores') },
    { icon: Terminal, title: t.cliTitle, description: t.cliDescription, href: href('/docs/reference/cli') },
    { icon: Puzzle, title: t.pluginTitle, description: t.pluginDescription, href: href('/docs/plugins') },
    { icon: Wrench, title: t.fixTitle, description: t.fixDescription, href: href('/docs/troubleshooting') },
  ];
  return (
    <main className="docs-home">
      <section className="home-hero">
        <div className="hero-copy">
          <div className="intro-link"><BookOpen size={15} />{t.handbook}</div>
          <h1>{t.heroLine1}<br />{t.heroLine2}</h1>
          <p>{t.heroDescription}</p>
          <div className="hero-actions"><Link href={href('/docs/getting-started/first-connection')} className="primary-link">{t.getConnected}<ArrowRight size={17} /></Link><Link href={href('/docs')} className="secondary-link">{t.browseDocs}<ArrowUpRight size={16} /></Link></div>
          <div className="platforms"><bdi>Windows</bdi><span /><bdi>macOS</bdi><span /><bdi>Linux</bdi><span /><bdi>Android</bdi><span /><bdi>iOS</bdi></div>
        </div>
        <div className="route-illustration" role="img" aria-label={t.routeLabel}>
          <div className="route-caption"><span className="status-dot" />{t.routeCaption}</div>
          <div className="route-source"><Laptop size={22} /><span>{t.yourDevice}</span></div>
          <div className="route-trunk" />
          <div className="route-branches">
            <div className="route-row route-vpn"><span className="route-wire" /><ShieldCheck size={19} /><div><strong>{t.throughVpn}</strong><span>{t.chosenServer}</span></div><Check size={15} className="route-check" /></div>
            <div className="route-row"><span className="route-wire" /><Globe2 size={19} /><div><strong>{t.direct}</strong><span>{t.ownConnection}</span></div></div>
            <div className="route-row"><span className="route-wire" /><span className="block-symbol">×</span><div><strong>{t.block}</strong><span>{t.noConnection}</span></div></div>
          </div>
          <div className="route-footnote">{t.yourRules}</div>
        </div>
      </section>
      <section className="start-section" aria-labelledby="start-title">
        <div className="section-heading"><h2 id="start-title">{t.startTitle}</h2><span>{t.startSubtitle}</span></div>
        <div className="guide-grid">{guides.map(({icon: Icon, ...guide}, index) => <Link className="guide-card" href={guide.href} key={guide.href}><div className="guide-top"><Icon size={21} /><span>{(index + 1).toLocaleString(lang)}</span></div><h3>{guide.title}</h3><p>{guide.description}</p><span className="guide-link">{guide.label}<ArrowRight size={15} /></span></Link>)}</div>
      </section>
      <section className="explore-section" aria-labelledby="explore-title"><div className="section-heading"><h2 id="explore-title">{t.exploreTitle}</h2><Link href={href('/docs')}>{t.allDocs}<ArrowUpRight size={14} /></Link></div><div className="explore-grid">{explore.map(({icon: Icon, ...item}) => <Link href={item.href} className="explore-item" key={item.href}><Icon size={21} /><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight size={16} /></Link>)}</div></section>
      <aside className="developer-strip"><Code2 size={23} /><div><h2>{t.developerTitle}</h2><p>{t.developerDescription}</p></div><Link href={href('/docs/developers/architecture')}>{t.architecture}<ArrowRight size={16} /></Link></aside>
      <footer className="home-footer"><span><bdi>NuggetVPN<span className="brand-dot">.</span></bdi> <span className="footer-muted">{t.madeBy}</span></span><div><a href="https://github.com/Rigby-Foundation/NuggetVPN">GitHub</a><a href="https://github.com/Rigby-Foundation/NuggetVPN/issues">{t.reportIssue}</a><span>{t.builtWith}</span></div></footer>
    </main>
  );
}
