# BURGERKU — Burger Food Sales Website

A modern, mobile-first burger restaurant website built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step — deploy anywhere as static files.

## Features

- Mobile-first responsive design (mobile / tablet / desktop)
- Slide-in navigation drawer with overlay (mobile)
- Desktop navigation bar (≥1024px)
- Product catalogue rendered from `js/products.js`
- Category filters with smooth transitions
- Product detail modal with quantity, add-ons & special instructions
- Shopping cart drawer with localStorage persistence
- Free delivery over RM30, RM5 delivery fee otherwise
- Checkout form → auto-generated WhatsApp order message
- Promo section, testimonials, about, contact with opening hours
- Floating "Order Now" button on mobile
- SEO: meta/OG tags, semantic HTML, JSON-LD Restaurant schema
- Accessible: ARIA labels, focus states, keyboard navigation

## Project structure

```
burger-website/
├── index.html          # Page markup & sections
├── css/
│   └── style.css       # All styles (mobile-first)
├── js/
│   ├── products.js     # Product data + SVG food art
│   ├── cart.js         # Cart state, localStorage, cart UI
│   └── app.js          # UI wiring, modals, checkout, WhatsApp
└── assets/
    └── images/og-burger.svg
```

## Configuration

Edit `js/app.js` → `CONFIG`:

```js
const CONFIG = {
  WHATSAPP_NUMBER: "60123456789", // your WhatsApp number (country code, no +)
  RESTAURANT_NAME: "BURGERKU",
  DELIVERY_ADDRESS: "...",
  MAPS_URL: "..."
};
```

Edit `js/cart.js` for `DELIVERY_FEE` / `FREE_DELIVERY_MIN`.

## Run locally

Any static server works:

```bash
npx serve .
# or
python -m http.server 8000
```

Or just open `index.html` in a browser.

## Deploy

Push to GitHub and enable **GitHub Pages**, or drag the folder into **Netlify Drop** / **Vercel**.

## Customising products

Add/edit items in the `PRODUCTS` array in `js/products.js`. Each product needs `id`, `name`, `category`, `price`, `rating`, `description`, `art` (one of the SVG art keys) and `bestseller`. Categories must match keys in `CATEGORIES`.
