# melexshop-api — JavaScript SDK

> Mirrored by `AGENT.md`. Keep both in sync.

## Purpose

The published npm package **`@melexshop/melexshop-api`** (v0.0.4, MIT). A thin axios-based client around the Rails `melexshop` API's **public storefront endpoints** (`/store/*`). Used by `melexshop-base-ecommerce` and any third-party storefront integration.

This SDK exposes only the public/anonymous storefront API. **Admin endpoints (`/core`, `/ecommerce`, `/cms`) are not wrapped here** — admin apps call the Rails API directly with axios.

## Stack

- **Language**: JavaScript (works in Node and browser)
- **Runtime dep**: `axios` ^1.5.1 — only one
- **Package**: `@melexshop/melexshop-api`
- **Repo**: github.com/Melexsoft/melexshop-api

## Use

```js
import melexshop from '@melexshop/melexshop-api';

const api = melexshop({
  store_token: 'YOUR_STORE_TOKEN',
  host: 'https://api.melexsoft.com',
});

await api.products.list();
await api.basket.addItem({ variant_id, quantity });
await api.orders.create({ ... });
```

`store_token` identifies the `Ecommerce` to the public `/store/*` API. `host` points at the Rails backend.

## Layout

```
index.js                  # entry — re-exports src/index
src/
├── index.js              # factory: melexshop({ store_token, host }) → api object
├── typedefs.js           # JSDoc @typedef declarations
└── endpoints/            # one file per resource — add new endpoints here
    ├── metaModels.js
    ├── categories.js
    ├── products.js
    ├── filters.js
    ├── basket.js
    ├── context.js        # store metadata (currency, languages…)
    ├── page.js           # CMS pages
    ├── payment.js
    └── orders.js
```

Each endpoint module exports a factory `(axiosInstance) => ({ ...methods })`. Methods return raw axios promises (callers handle `.then(res => res.data)`).

## Scripts

There are **no build, test, or lint scripts** in `package.json`. The package is published as-is (CommonJS-style, no bundler).

```bash
npm install            # install axios
# To publish a new version:
npm version patch      # bump 0.0.4 → 0.0.5
npm publish --access public
```

## Conventions

- **Stateless** — no caching, no auth tokens stored. The `store_token` is sent on every request via headers/query (whichever the Rails `/store` controller expects).
- **Async/await** throughout. All endpoint methods return promises.
- **No TypeScript** — types are JSDoc-only (`src/typedefs.js`). When adding endpoints, extend the typedefs.
- **One file per resource** under `src/endpoints/`. Wire new modules into `src/index.js`.

## When changing this package

1. The SDK is **consumed by `melexshop-base-ecommerce`** (and external users). A breaking change is a published-package breaking change — bump the major version.
2. Endpoints must exist on the Rails side first. Check `melexshop/config/routes.rb` under the `store` namespace before adding a method here.
3. There are no tests. Manual smoke-test against a running Rails API before publishing.
4. Don't add a build step or a TypeScript rewrite without coordinating — every consumer would need updates.

## What this SDK is NOT for

- ❌ Admin operations (use direct axios calls in the admin apps)
- ❌ Authenticated user actions outside the storefront
- ❌ Webhooks / server-to-server integrations (`/endpoint`, `/external`)
