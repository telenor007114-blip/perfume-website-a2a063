# Al Hejaz-e-Perfume

A responsive Arabic perfume storefront featuring six fragrances, international delivery information, and direct WhatsApp ordering.

The site uses plain HTML, CSS, and JavaScript, with no build step or runtime dependencies. Netlify publishes `public/`. The generated hero image is served through Netlify Image CDN. Google Fonts supplies Cormorant Garamond and DM Sans, with local font fallbacks.

To run locally with image optimization, use `netlify dev --port 8889`. A basic static web server can also serve `public/`, but the Netlify Image CDN endpoint requires Netlify.

Product details and prices are maintained in `public/app.js`; layout and content are in `public/index.html`, and styling is in `public/styles.css`. WhatsApp orders are prepared in the browser and sent only when the customer sends the message in WhatsApp. No customer information is stored by the site. International shipping and order availability are confirmed personally.
