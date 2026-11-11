# Project architecture

This is a static storefront for Al Hejaz-e-Perfume. Netlify publishes `public/`, configured in `netlify.toml`. There is no package manager, framework, backend, or build step.

- `public/index.html`: semantic page structure, metadata, delivery information, accessible order form.
- `public/styles.css`: responsive cream, charcoal and gold design, CSS bottle illustrations, reduced motion support.
- `public/app.js`: product catalog, rendered product cards, order totals, and encoded WhatsApp order messages.
- `public/img/oud-hero.png`: generated decorative hero photograph, delivered through Netlify Image CDN.

Keep contact details and product prices consistent across the page and script. All six products must appear in the order dropdown. Product card order links open WhatsApp directly; the detailed form validates and prepares a message including the selected product, quantity, contact details and address. Pakistan shipping is Rs. 250; international shipping is confirmed on WhatsApp. USD values are display references, while totals use PKR. Do not add payment or order confirmation claims: the team confirms in WhatsApp.

Use plain JavaScript, semantic HTML, visible labels, keyboard focus, responsive CSS, and reduced-motion handling. No data persists on this site; customer details only enter the prepared WhatsApp message. Avoid introducing backend services unless requested. The AI image generation SDK is a development tool used outside this repository and is not a runtime dependency.
