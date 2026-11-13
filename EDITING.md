# Editing the Continyum website

You can change everything on the site from your browser. No code, no Git commands.

The tool is called **Pages CMS**. Whenever you press **Save**, it stores your change on GitHub, and the site rebuilds itself. Your change is live about **1–2 minutes** later.

---

## Logging in

1. Go to **https://app.pagescms.org**.
2. Click **Sign in with GitHub** and use the GitHub account that owns the website.
3. Pick the **continyum-website** project (the first time, you may need to click **Install** to give Pages CMS access to it).
4. On the left you'll see: **Home page · Research · Products · Team · Contact page**.

---

## Change the home page

Click **Home page**. Everything on the landing screen is here:

- **Eyebrow**: the small uppercase line above the headline.
- **Headline**: the big line.
- **Highlighted phrase**: words from the headline shown in italic with a colour underline (currently "frontier technology"). It must match the headline exactly, including capitals. Leave it empty for no highlight.
- **Subline**: the sentence under the headline.
- **Main button** and **Second link**: the text and where they go. Use a page like `/research` or `/contact`, or a full `https://` address.
- **Show "Now researching" ticker**: shows your newest *In progress* research paper at the bottom of the screen.

Click **Save** when you're done.

The **Page intros** on the same screen are the sentence shown under the title on the Research, Products and Team pages.

---

## Add a research paper

1. Click **Research** → **Add an entry**.
2. Fill in:
   - **Title**
   - **One-line description**: shown in the list.
   - **Date**: used for ordering, newest first.
   - **Status**: In progress, Published or Preprint (optional).
   - **Authors**: click to add each name (optional).
   - **External link**: full address of the paper, e.g. `https://arxiv.org/abs/…`. Shows a "Read the paper →" link (optional).
   - **Body**: the text of the page. Use the toolbar for headings, lists, links and images.
3. Click **Save**.

---

## Add a product

1. Click **Products** → **Add an entry**.
2. Fill in **Name**, **One-line description**, **Status** (Live, Pilot or In development), an optional **Website**, and the **Body**.
3. **Order** controls the list order: 1 comes before 2.
4. Click **Save**.

**Coming soon:** while no product is published (all are drafts, or there are none), the Products page shows a "Coming soon" screen and the menu shows a small *Soon* tag. Publish your first product (untick **Draft**) and both switch to the normal product list automatically. The Coming soon wording is under **Home page → Page intros → Products → Coming soon screen**.

> **Verant** is already set up as a draft. Before publishing it, replace its placeholder description and body.

---

## Add or update a demo

Demos live under **Products** on the site (a "Demos" group on the Products page, and a page each at `/products/demos/…`). The home page shows three of them.

1. Click **Demos**. Open one to edit it, or click **Add an entry**.
2. Fill in:
   - **Name** and **Tagline**: the one-line summary on the card.
   - **The problem**: one or two sentences.
   - **How it works**: three to five short steps, one per entry.
   - **Status**:
     - **In development**: not yet usable.
     - **Prototype**: early version.
     - **Working demo**: someone can try it.
   - **Example output** (optional): made-up sample output. It's always shown under the label "Illustrative example".
   - **Demo link** / **Video link**: paste a full `https://` address to add a **Try it** button or a **Watch video** link. While a field says `[PLACEHOLDER]` or is empty, no button is shown.
   - **Screenshots**: upload up to six images.
   - **Stack**: the tools used, one per entry (optional).
   - **Animated illustration**: which of the six built-in animations to show. Leave it empty and the first screenshot is used instead.
   - **Featured on home page**: the home page shows three demos, featured ones first, then by **Order**.
   - **Order**: 1 comes first.
3. Click **Save**.

**Keep demos honest.** Don't describe a demo as client work or a live product, and only use made-up numbers in examples and screenshots. The site already labels the illustrations "Illustrative sample data" and adds a note under every demo list. You can edit that note under **Home page → Demos section**, where you can also hide the demos from the home page.

---

## Add a team member (with a photo)

1. Click **Team** → **Add an entry**.
2. Fill in **Name**, **Role** and an optional **One-line bio**.
3. **Photo**: click the field, then **Upload** and choose an image. It's shown as a circle, so a square photo with the face centred looks best. Any size is fine because the site resizes and compresses it automatically. Leave it empty for no photo. Nothing is shown in its place.
4. **Links**: click **Add** for each one. The label is the text people see, and the URL is where it goes:
   - Email: label `name@continyum.in`, URL `mailto:name@continyum.in`
   - Phone: label `+91 98765 43210`, URL `tel:+919876543210` (no spaces)
   - LinkedIn or any website: label `LinkedIn`, URL `https://…`

   The site picks the right little icon automatically.
5. **Order**: 1 appears first.
6. **Show on Contact page**: ticked by default. Untick it to list someone on the Team page only, not under "Talk to a founder" on the Contact page.
7. Click **Save**.

---

## Update the contact page

Click **Contact page**. You can change:

- **Headline** ("Let's talk.") and **Intro**.
- **Email**.
- **Topic buttons**: each one opens an email to you with its subject already filled in. Add, remove or reorder them freely.
- **Address lines**: one line per entry.
- **Map panel**: the coordinates, time zone and Google Maps link.
- **Scrolling greetings**: the big words that drift across the bottom of the page.
- **Other channels**: for example your company LinkedIn page or X.

Then click **Save**.

The email, address and channels appear both on the Contact page and in the footer of every page, so you only change them here. The **Talk to a founder** section is built automatically from the **Team** entries.

## Change the footer

The footer builds itself:

- The **Products** column lists your products automatically.
- **Get in touch** comes from the Contact page.
- The line under the logo is **Home page → Footer tagline**.

---

## Hide something (draft)

Research and Products entries have a **Draft** checkbox.

- **Ticked**: the entry disappears from the whole site (the list and its own page). Nothing is deleted. Untick it to bring it back.
- Use it to prepare something before it's ready, or to take something down temporarily.

To remove something permanently, open it and use **Delete**.

---

## Good to know

- **Links** must start with `https://` (or `mailto:` for email, `tel:` for phone). If one doesn't, the site won't update. See below.
- **Didn't update?** Open the project on GitHub and click the **Actions** tab. A red ✗ means the last change had a problem. Click it, and the error usually names the file and field (for example, a link without `https://`). Fix it in Pages CMS and save again.
- **Web addresses** of research and product pages are created from the title when you first save. Changing the title later doesn't change the address, so links people have shared keep working.
