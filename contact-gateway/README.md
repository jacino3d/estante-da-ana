# WhatsApp contact gateway

The Worker is deployed separately from GitHub Pages at `https://estante-da-ana-contato.jcphillips3d.workers.dev/`.

## Runtime flow

1. The shop sends the selected book enquiry to the Worker over HTTPS.
2. The visitor enters their name and completes Cloudflare Turnstile.
3. The Worker validates the one-time challenge server-side, then redirects to `wa.me` with the name inside the greeting and the selected books.
4. The visitor reviews and sends the draft in WhatsApp; the Worker does not send messages.

The phone and Turnstile secret exist only as production Worker secrets (`PHONE` and `TURNSTILE_SECRET`). The public site key and account ID are not secrets. Never put the phone or secret in GitHub, the Pages files, or a URL.

The Worker limits requests, bounds submitted text, escapes page content, sends no-store/no-referrer headers, and disables Worker observability logs. A short-lived edge cache contains only hashes to make retries of a verified token idempotent. Cloudflare still processes requests under the account's own platform policies.

## Deploy and maintain

Use `wrangler.jsonc` and deploy from this directory with `npx wrangler deploy`. Keep `PHONE`, `TURNSTILE_SECRET`, and the Turnstile widget's allowed hostname aligned with the Worker hostname. Update `site-config.js` only if the public Worker URL changes.

The stock editor is intentionally excluded from the public Pages build while private access is being configured. A static page password is not a security boundary; protect editor access through Cloudflare Access or keep it local.

## Limits

Turnstile reduces automated scraping; it cannot prevent a person who passes the check from seeing the WhatsApp contact in their browser. The visitor's typed name and enquiry become visible to WhatsApp after redirect. The bookshop does not store them.
