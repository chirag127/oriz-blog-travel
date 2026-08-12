# oriz-blog-travel

Field notes for Indian travellers — budget routes, solo-travel safety, and digital-nomad visas, logged mile by mile.

**Live:** https://travel-blog.oriz.in

[![License: MIT](https://img.shields.io/badge/License-MIT-e4572e.svg)](./LICENSE)
![Astro](https://img.shields.io/badge/built%20with-Astro-0f2e2b.svg)

A travel blog for budget, solo, and digital-nomad travellers from India. Built
on Astro with an MDX content collection, full-text search (Pagefind), RSS/Atom
feeds, and a PWA offline shell.

## Design — "Field Log"

A traveller's logbook meets a transit-ticket system. Distinct visual identity,
not shared with any sister site:

- **Palette:** deep expedition-teal paper (`#0f2e2b`), passport-stamp vermilion
  accent (`#e4572e`), sun-gold data flag (`#f2b705`), warm map-paper text
  (`#f2ede0`).
- **Type:** Fraunces (display, old-atlas serif) · Newsreader (body, travelogue
  serif) · Space Mono (coordinates, altitudes, ticket data).
- **Signature:** the route-spine (`●━━●╌╌○`) — series progress drawn as a
  transit route line — plus a coordinate dateline on the front page.

## Develop

```bash
npm install --legacy-peer-deps
npm run dev      # local dev server
npm run build    # static build → dist/
```

Posts live in `src/content/blog/` as `.md`/`.mdx` — see `src/content.config.ts`
for the frontmatter schema.

## License

MIT — see [LICENSE](./LICENSE).
