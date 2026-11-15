import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/*
 * The CMS sometimes saves an empty optional field as "" or null.
 * Treat those as "not set" so the build never fails on a blank field.
 */
const blank = (value: unknown) => (value === '' || value === null ? undefined : value);
const optional = <T extends z.ZodType>(schema: T) => z.preprocess(blank, schema.optional());
const optionalList = <T extends z.ZodType>(item: T) =>
  z.preprocess((value) => {
    if (!Array.isArray(value)) return blank(value);
    const items = value.filter((v) => blank(v) !== undefined);
    return items.length ? items : undefined;
  }, z.array(item).optional());

/* "[PLACEHOLDER]" (or any "[...]") means "not filled in yet" — treated as empty. */
const isPlaceholder = (value: unknown) => typeof value === 'string' && /^\s*\[.*\]\s*$/.test(value);
const optionalUrl = z.preprocess(
  (v) => (blank(v) === undefined || isPlaceholder(v) ? undefined : v),
  z.url().optional(),
);
const placeholderFreeList = <T extends z.ZodType>(item: T) =>
  z.preprocess((value) => {
    if (!Array.isArray(value)) return undefined;
    const items = value.filter((v) => blank(v) !== undefined && !isPlaceholder(v));
    return items.length ? items : undefined;
  }, z.array(item).optional());

const link = z.object({
  label: z.string(),
  url: z.url(),
});

/* A button: label + where it goes (a page like /research, or a full URL). */
const cta = z.object({
  label: z.string(),
  href: z.string(),
});

/* ---------- Single files ---------- */

const home = defineCollection({
  loader: glob({ pattern: 'home.yaml', base: './src/content/site' }),
  schema: z.object({
    eyebrow: optional(z.string()),
    headline: z.string(),
    highlight: optional(z.string()),
    subline: optional(z.string()),
    primary_cta: optional(cta),
    secondary_cta: optional(cta),
    show_now_researching: optional(z.boolean()),
    tagline: optional(z.string()),
    // Copy for the Demos group (home page + /products)
    demos: optional(
      z.object({
        show_on_home: optional(z.boolean()),
        label: z.string(),
        heading: z.string(),
        text: z.string(),
        note: z.string(),
        link_label: z.string(),
      }),
    ),
    // Search engine titles/descriptions. Anything left empty falls back to the page's own text.
    seo: optional(
      z.object({
        home_title: optional(z.string()),
        home: optional(z.string()),
        research: optional(z.string()),
        products: optional(z.string()),
        team: optional(z.string()),
        contact: optional(z.string()),
      }),
    ),
    sections: z.object({
      research: z.object({ summary: z.string() }),
      products: z.object({
        summary: z.string(),
        // Shown on /products while no product is published
        coming_soon: z.object({
          headline: z.string(),
          text: z.string(),
          button: z.string(),
        }),
      }),
      team: z.object({ summary: z.string() }),
    }),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: 'contact.yaml', base: './src/content/site' }),
  schema: z.object({
    headline: optional(z.string()),
    intro: z.string(),
    email: z.string(),
    topics: optionalList(z.object({ label: z.string(), subject: z.string() })),
    address: optionalList(z.string()),
    location: optional(
      z.object({
        coordinates: optional(z.string()),
        timezone: optional(z.string()),
        map_url: optional(z.url()),
      }),
    ),
    greetings: optionalList(z.string()),
    channels: optionalList(link),
  }),
});

/* ---------- Collections ---------- */

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: optional(z.enum(['In progress', 'Published', 'Preprint'])),
    authors: optionalList(z.string()),
    link: optional(z.url()),
    draft: optional(z.boolean()),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(['Live', 'Pilot', 'In development']),
    url: optional(z.url()),
    order: optional(z.coerce.number()),
    draft: optional(z.boolean()),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      bio: optional(z.string()),
      photo: optional(image()),
      links: optionalList(link),
      order: optional(z.coerce.number()),
      // false = listed on the Team page only, not under "Talk to a founder" on Contact
      show_on_contact: optional(z.boolean()),
    }),
});

const demos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/demos' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      problem: z.string(),
      howItWorks: z.array(z.string()).min(3).max(5),
      status: z.enum(['Working demo', 'Prototype', 'In development']),
      // Shown only under the label "Illustrative example"
      exampleOutput: optional(z.string()),
      demoUrl: optionalUrl,
      videoUrl: optionalUrl,
      screenshots: placeholderFreeList(image()),
      stack: placeholderFreeList(z.string()),
      // Which built-in animated illustration to show
      illustration: optional(z.enum(['rto', 'voice', 'ops', 'competitor', 'creative', 'cfo'])),
      featured: z.boolean().default(false),
      order: z.coerce.number().default(99),
      draft: z.boolean().default(false),
    }),
});

/* Legal pages (e.g. the privacy policy): title, dates, Markdown body. */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    effective: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

export const collections = { home, contact, research, products, team, demos, legal };
