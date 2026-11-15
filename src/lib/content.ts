import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Research = CollectionEntry<'research'>;
export type Product = CollectionEntry<'products'>;
export type Person = CollectionEntry<'team'>;
export type Demo = CollectionEntry<'demos'>;

/** All published demos, by `order` then name. Drafts are always excluded. */
export async function getDemos(): Promise<Demo[]> {
  const items = await getCollection('demos', ({ data }) => !data.draft);
  return items.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

/** Featured demos first (then the rest, in order), up to `limit`. */
export async function getFeaturedDemos(limit = 3): Promise<Demo[]> {
  const all = await getDemos();
  return [...all.filter((d) => d.data.featured), ...all.filter((d) => !d.data.featured)].slice(0, limit);
}

/** Prefix an internal path with the site's base path (needed for GitHub Pages project sites). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const full = path.startsWith('/') ? path : `/${path}`;
  // Page links end in "/" (GitHub Pages redirects "/team" to "/team/"), so
  // nobody, Google included, has to follow a redirect. Files (".xml") are left alone.
  const [, pathname, rest = ''] = full.match(/^([^?#]*)(.*)$/)!;
  const needsSlash = !pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(pathname);
  return `${base}${pathname}${needsSlash ? '/' : ''}${rest}`;
}

/** A link typed in the CMS: internal paths ("/research") get the base path, full URLs pass through. */
export function href(link: string): string {
  return link.startsWith('/') ? url(link) : link;
}

export async function getHome() {
  const entry = await getEntry('home', 'home');
  if (!entry) throw new Error('Missing src/content/site/home.yaml');
  return entry.data;
}

export async function getContact() {
  const entry = await getEntry('contact', 'contact');
  if (!entry) throw new Error('Missing src/content/site/contact.yaml');
  return entry.data;
}

/** All published research, newest first. Drafts are always excluded. */
export async function getResearch(): Promise<Research[]> {
  const items = await getCollection('research', ({ data }) => !data.draft);
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const byOrder = (a?: number, b?: number) =>
  (a ?? Number.POSITIVE_INFINITY) - (b ?? Number.POSITIVE_INFINITY);

/** All published products, by `order` then name. Drafts are always excluded. */
export async function getProducts(): Promise<Product[]> {
  const items = await getCollection('products', ({ data }) => !data.draft);
  return items.sort(
    (a, b) => byOrder(a.data.order, b.data.order) || a.data.name.localeCompare(b.data.name),
  );
}

/** Team members, by `order` then name. */
export async function getTeam(): Promise<Person[]> {
  const items = await getCollection('team');
  return items.sort(
    (a, b) => byOrder(a.data.order, b.data.order) || a.data.name.localeCompare(b.data.name),
  );
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
