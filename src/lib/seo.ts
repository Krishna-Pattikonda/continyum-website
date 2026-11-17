// Structured data (schema.org JSON-LD) that tells search engines who Continyum is.
import { getContact, getTeam, url } from './content';

const abs = (path: string) => new URL(url(path), import.meta.env.SITE).href;

export const ORG_ID = () => abs('/') + '#organization';

const linkedIn = (links?: { label: string; url: string }[]) =>
  (links ?? []).filter((l) => l.url.startsWith('https://')).map((l) => l.url);

export async function people() {
  const team = await getTeam();
  return team.map(({ id, data: p }) => ({
    '@type': 'Person',
    '@id': abs('/team/') + '#' + id,
    name: p.name,
    jobTitle: p.role,
    ...(p.bio ? { description: p.bio } : {}),
    worksFor: { '@id': ORG_ID() },
    sameAs: linkedIn(p.links),
  }));
}

export async function organization() {
  const contact = await getContact();
  const team = await people();
  const founderIds = new Set(
    (await getTeam()).filter((p) => p.data.founder).map((p) => abs('/team/') + '#' + p.id),
  );
  const founders = team.filter((p) => founderIds.has(p['@id']));
  const lines = contact.address ?? [];
  return {
    '@type': 'Organization',
    '@id': ORG_ID(),
    name: 'Continyum',
    url: abs('/'),
    logo: { '@type': 'ImageObject', url: abs('/apple-touch-icon.png'), width: 180, height: 180 },
    image: abs('/og-image.png'),
    description:
      'Continyum is an enterprise AI and frontier technology company in Visakhapatnam, India. We research hard problems in AI, such as reliable LLM agents, and turn them into products.',
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: lines[0],
      addressLocality: 'Visakhapatnam',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Enterprise AI',
      'Artificial intelligence',
      'Large language models',
      'AI agents',
      'Machine learning research',
      'AI for e-commerce',
    ],
    founder: founders.map((p) => ({ '@id': p['@id'] })),
    employee: team.map((p) => ({ '@id': p['@id'] })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: contact.email,
      areaServed: 'IN',
      availableLanguage: 'English',
    },
    sameAs: (contact.channels ?? []).map((c) => c.url).filter((u) => u.startsWith('https://')),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': abs('/') + '#website',
    name: 'Continyum',
    url: abs('/'),
    publisher: { '@id': ORG_ID() },
    inLanguage: 'en',
  };
}
