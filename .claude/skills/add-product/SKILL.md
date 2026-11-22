---
name: add-product
description: Add an Amazon affiliate product page to win-net.co.uk end to end. Use when the user sends an Amazon product link (with or without a PDF/screenshot of the page) or asks to add, review or recommend a product.
---

# Add a product to the Winet Recommended section

Goal: one message from the user (Amazon link + PDF of the Amazon page) becomes a live, SEO-optimised
product page with no questions asked, unless a required fact is missing.

## 1. Get the facts (never invent specs)
- ASIN = the 10 characters after `/dp/` or `/gp/product/` in the link. amazon.co.uk only; amzn.eu/amzn.to
  short links: ask for the full link or product name.
- Specs come ONLY from what the user sends: the PDF/screenshot of the Amazon page (read it with the Read
  tool, `pages` param), or pasted "About this item" text. Do not scrape or fetch Amazon (bot protection,
  and the Associates agreement forbids scraping). If no PDF/text was sent, ask for one in a single line.
- Never copy Amazon prices or Amazon images onto the site. No price in the review text.
- Note the SiteStripe "Commission rates" box if visible in the PDF (useful to tell the user).

## 2. Keyword research (OpenSEO, project "Winet", id a302158e-09da-4635-9bfa-e68d2ecb7cf6, UK)
- `get_keyword_metrics` on ~15-25 candidate phrases: product type + size/feature + "best", "cheap/budget",
  brand + type, use cases (office, school, working from home). Cheap (a few credits); no confirmation needed.
- Pick a primary keyword (high volume, low difficulty, buying intent) and 2-3 secondaries.
- Ask before any OpenSEO batch over 2,000 credits.

## 3. Write `_products/<brand>-<model>-<short-type>.md` (lowercase, dashes)
Follow `_products/example-product.md` / `PRODUCTS.md`. Fields:
- `title`: "<Brand> <Model> <size/type>"
- `seo_title`: <= 60 chars, primary keyword first, e.g. "Cheap 27-inch monitor with speakers | Philips 27E1N1190A"
- `category` (reuse existing names: Monitors, Networking, Laptops, Accessories, Printers, Storage, Security),
  `brand`, `asin`, `summary` (~150 chars, contains primary keyword), `best_for`
- `pros` (4-5) / `cons` (2-3): factual, from the listing; cons honest (resolution, ports, missing features)
- `faq`: 4-6 real buyer questions answered from the specs; include one with the primary keyword
- `rating`: ONLY if the user gave a score. Never make one up.
- Body: 3 short paragraphs in plain British English, Winet voice (helpful IT people, no jargon, no hype).
  Use the primary keyword in the first sentence. No claims of personal testing unless the user said so.
- If the user says something about it ("budget-friendly", "we install these"), make that the angle.

## 4. Check, publish, notify
```bash
jekyll build -q -d "$SCRATCH/_site"     # must succeed; check title, buy link has ?tag=winet0c-21, JSON-LD parses
git add -A && git commit -m "Add product: <name>" (with the session's attribution trailer)
tools/publish.sh "Add product: <name>" "<what it targets>"
```
Then OpenSEO `submit_indexnow_urls` with the product URL and https://win-net.co.uk/products/.

## 5. Reply (short)
Live URL, the keyword it targets (volume/difficulty), anything left out (e.g. no rating given, no photo),
and the commission rate if known. Ask for a score out of 5 and an own photo only if missing.
