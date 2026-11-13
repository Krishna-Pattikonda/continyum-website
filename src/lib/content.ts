import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Research = CollectionEntry<'research'>;
export type Product = CollectionEntry<'products'>;
export type Person = CollectionEntry<'team'>;

/** Prefix an internal path with the site's base path (needed for GitHub Pages project sites). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
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
