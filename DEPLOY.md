# Putting the Winet website live on win-net.co.uk

The site is published by GitHub Pages. Every push to this repository rebuilds it automatically
(see `.github/workflows/pages.yml`). Three one-off steps are needed.

## 1. Allow GitHub to host it

GitHub Pages only works for **private** repositories on a paid plan (GitHub Pro, about $4/month).
Pick one:

- **Free:** make the repository public. GitHub → this repository → **Settings → General →
  Danger Zone → Change visibility → Public**. The code contains nothing secret; it is the same
  HTML anyone can already see by visiting the website.
- **Paid:** upgrade your account to GitHub Pro at https://github.com/settings/billing and keep it private.

## 2. Turn on Pages

GitHub → this repository → **Settings → Pages**:

1. **Source:** choose **GitHub Actions**.
2. **Custom domain:** enter `win-net.co.uk` and click **Save**.
3. Go to the **Actions** tab, open **Publish website**, and click **Run workflow**.
4. Once the DNS below has taken effect, come back and tick **Enforce HTTPS**.

## 3. Point the domain at GitHub

Log in to wherever win-net.co.uk is registered (e.g. 123-reg, GoDaddy, Fasthosts, Cloudflare)
and open its **DNS settings**.

> ⚠️ **Do not change or delete the MX records** (or any TXT records for SPF/DKIM).
> They deliver email to service@win-net.co.uk. Only touch the records listed below.

Remove any existing **A** / **AAAA** records for `@` (the bare domain) and any existing record
for `www`, then add:

| Type  | Name / Host | Value                     |
|-------|-------------|---------------------------|
| A     | @           | 185.199.108.153           |
| A     | @           | 185.199.109.153           |
| A     | @           | 185.199.110.153           |
| A     | @           | 185.199.111.153           |
| AAAA  | @           | 2606:50c0:8000::153       |
| AAAA  | @           | 2606:50c0:8001::153       |
| AAAA  | @           | 2606:50c0:8002::153       |
| AAAA  | @           | 2606:50c0:8003::153       |
| CNAME | www         | winternitzyy.github.io    |

DNS changes usually show up within an hour but can take up to 24 hours. After that,
https://win-net.co.uk shows the site, and www.win-net.co.uk forwards to it.

Recommended: in GitHub **Settings → Pages**, use **Verify domains** (it gives you one extra TXT
record to add) so nobody else can claim win-net.co.uk on GitHub.
