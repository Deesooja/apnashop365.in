# ApnaShop365.in

Frontend-only fancy jewelry storefront. Orders go through WhatsApp — this site never takes payment.

## Stack

- Vite + React 18 (JavaScript)
- Material UI
- Redux Toolkit (cart + cart drawer only)
- React Router
- react-helmet-async

## Install & run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview dist/
npm run lint     # ESLint
```

## Deploy

### Netlify

1. Connect the repo or drag-and-drop `dist/` after `npm run build`.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. SPA fallback is in [`public/_redirects`](public/_redirects) (`/* → /index.html 200`).

### Vercel

1. Import the project.
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output: `dist`
5. SPA rewrites are in [`vercel.json`](vercel.json).

Set the production domain to match `siteConfig.siteUrl` (`https://apnashop365.in`).

## Add products / categories (JSON only)

1. Edit [`src/data/categories.json`](src/data/categories.json) — fields: `slug`, `name`, `image`, `description`.
2. Edit [`src/data/products.json`](src/data/products.json) — fields: `id`, `slug`, `name`, `category` (must match a category slug), `price`, `discountPrice` (or `null`), `images[]`, `material`, `description`, `tags[]`, `inStock`, `isFeatured`, `createdAt`.
3. Rebuild / refresh. No code changes required for new categories or products.
4. Update [`public/sitemap.xml`](public/sitemap.xml) with new product/category URLs when you go live.

## Business config

All phone numbers, address, social links, hero slides, WhatsApp message templates, policies, FAQ, and delivery notes live in [`src/config/siteConfig.js`](src/config/siteConfig.js).

UI chrome translations: [`src/config/i18n.js`](src/config/i18n.js).  
Brand colors / fonts: [`src/theme/theme.js`](src/theme/theme.js).

## siteConfig TODO checklist

Fill every item marked `TODO` in `src/config/siteConfig.js` before launch:

- [ ] `tagline` (EN + HI)
- [ ] `logoSrc` — optional image logo (leave `null` for text logo)
- [ ] Confirm WhatsApp `number` (`919183984206`)
- [ ] `contact.address` (EN + HI)
- [ ] `contact.phoneDisplay` / `phoneTel` if different from WhatsApp
- [ ] `contact.email`
- [ ] `contact.mapEmbedUrl` — Google Maps iframe `src`
- [ ] `social.instagram` / `facebook` / `youtube`
- [ ] `delivery.chargeNote` (EN + HI)
- [ ] `policies.openBoxDelivery` section bodies (EN + HI) — paste real policy
- [ ] `policies.returnPolicy` section bodies (EN + HI) — paste real policy
- [ ] `about.body` brand story (EN + HI)
- [ ] FAQ answers that still say TODO (materials disclaimer, policy alignment)
- [ ] Hero slide images if you want owned photography instead of placeholders
- [ ] Replace product/category placeholder images in JSON with your photos
- [ ] Favicon / `og-default.svg` if you want custom brand art

## Order flows

1. **Direct:** Product card or product page → Order on WhatsApp → pre-filled product details + customer info questions.
2. **Cart:** Add to Cart → drawer or `/cart` → Order all on WhatsApp → full line list + grand total.

Templates are editable under `siteConfig.whatsappTemplates`.
