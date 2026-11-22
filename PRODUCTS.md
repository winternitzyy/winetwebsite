# Adding a recommended product

Every product is one file in the `_products/` folder. GitHub builds a page for it at
`win-net.co.uk/products/<file-name>/` and adds it to the **Recommended** page
(win-net.co.uk/products/). The **Recommended** link appears in the menu once the first product is live.

## Quickest way: from your browser

1. On GitHub, open this repository and switch the branch dropdown to **staging**.
2. Open the `_products` folder and click **Add file → Create new file**.
3. Name it after the product, in lowercase with dashes, ending in `.md`,
   e.g. `unifi-u6-plus-access-point.md`. This becomes the page address.
4. Paste the template below and fill it in.
5. Click **Commit changes**.
6. Open a pull request from **staging** into **main** and merge it. The page is live a few minutes later.

(Or just tell Claude "add this product: <Amazon link> + what you think of it" and it will do the rest.)

## Template

```markdown
---
title: Product name
category: Networking
summary: One sentence on why it's worth buying.
best_for: Who it suits, e.g. small offices.
asin: B0XXXXXXXX
pros:
  - First good thing
  - Second good thing
cons:
  - Anything to be aware of
---

Your own review in plain English. Why you recommend it, who it's for, any setup tips.
```

## Fields

| Field | Needed? | What it is |
|---|---|---|
| `title` | Yes | Product name, shown as the page heading. |
| `asin` | One of these | The code after `/dp/` in the Amazon address, e.g. `B0C1234567`. |
| `amazon_url` | One of these | A full Amazon link, e.g. an `amzn.to` link from the Associates SiteStripe bar. Use this instead of `asin` if you prefer. |
| `summary` | Recommended | One sentence for the card and the top of the page. |
| `category` | Optional | e.g. Networking, Laptops, Security, Accessories. |
| `best_for` | Optional | Who it suits. |
| `pros` / `cons` | Optional | Bullet lists. |
| `image` | Optional | Your own photo uploaded to `assets/products/`, e.g. `/assets/products/router.jpg`. |
| `published: false` | Optional | Keeps a product as a draft, off the live site. |

## Amazon Associates rules to keep in mind

- **Tracking ID:** set your tag once in `_config.yml` (`amazon_tag: yourtag-21`). Every button picks it up.
- **Don't copy Amazon's photos** onto the site. Use your own photos, or leave `image` out to show the Winet placeholder.
- **Don't write prices** in the review. Prices change, and Amazon only allows prices pulled live from its API.
  The button sends people to Amazon for the current price.
- **Don't put affiliate links in emails, PDFs or messages.** Send customers the win-net.co.uk product page
  instead; they click through to Amazon from there.
- The "As an Amazon Associate, Winet earns from qualifying purchases" disclosure is added automatically on every page.
