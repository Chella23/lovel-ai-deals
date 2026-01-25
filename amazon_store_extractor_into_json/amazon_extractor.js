/* 
  Amazon Product Extractor Script
  
  How to use:
  1. Open the Amazon Influencer Storefront page in your browser (e.g., Chrome).
     URL: https://www.amazon.in/shop/engineeringfacts
  
  2. Scroll down repeatedly to ensure all products are loaded (Lazy Loading).
     You might need to click on specific lists like "My Tools" if products are categorized.
  
  3. Open the Developer Tools:
     - Windows/Linux: Press F12 or Ctrl + Shift + J
     - Mac: Cmd + Option + J
     - Or Right-click anywhere on the page -> Inspect -> Click "Console" tab.
  
  4. Copy and paste the code below into the Console and press Enter.
  
  5. The JSON data will be output to the console. You can copy it and save it to a file.

  6. Then paste it into the outside of the amazon_extractor.js file folder 
  see there is also one file named merge_products.cjs 
  so use that one only merge_products.cjs inside the rawNewProducts array 
  and run the merge_products.cjs file 
  to merge the new products into the existing products.json file.
*/
(() => {
    console.log("Starting extraction...");

    // Attempt to find the category from the Idea List title or Page Title
    let pageCategory = "Electronics"; // Default
    try {
        // Common selectors for Amazon Influencer / Idea List titles
        const titleEl = document.querySelector('h1') ||
            document.querySelector('[data-hook="archetype-title"]') ||
            document.querySelector('#item_page_title');
        if (titleEl) {
            pageCategory = titleEl.innerText.trim();
        }
    } catch (e) {
        console.log("Could not detect category, using default.");
    }
    console.log(`Detected Category: ${pageCategory}`);

    const products = [];

    // Find all links that look like product items
    const allLinks = Array.from(document.querySelectorAll('a.single-product-item-link'));

    // Identify key containers for products
    const containerMap = new Map();
    allLinks.forEach(link => {
        let container = link.parentElement;
        // Walk up the DOM to find the container holding the image, title, and price
        while (container && container.tagName !== 'BODY') {
            // Heuristic: A product container usuall has at least 2 links (image + title) pointing to the product
            if (container.querySelectorAll('a.single-product-item-link').length >= 2) break;
            container = container.parentElement;
        }
        if (container && container.tagName !== 'BODY') containerMap.set(container, true);
    });

    const uniqueContainers = Array.from(containerMap.keys());
    console.log(`Found ${uniqueContainers.length} potential product items.`);

    uniqueContainers.forEach(container => {
        try {
            // Extract Title
            const links = Array.from(container.querySelectorAll('a.single-product-item-link'));
            // The title link is usually the one with text
            const titleLink = links.find(l => l.innerText.trim().length > 10) || links[0];

            if (!titleLink) return;

            const productLink = titleLink.href;
            const title = titleLink.innerText.trim();

            // Extract ASIN from link
            let asin = "";
            const match = productLink.match(/(?:\/dp\/|\/gp\/product\/|(?<!\/)\/)([A-Z0-9]{10})(?:$|\/|\?)/);
            if (match) {
                asin = match[1];
            }

            // Extract Image
            const imgs = Array.from(container.querySelectorAll('img'));
            // Filter out tiny icons, usually the product image is substantial
            const productImg = imgs.find(img => img.width > 50) || imgs[0];
            const imageUrl = productImg ? productImg.src : "";

            // Extract Price
            const priceEl = container.querySelector('span.a-price-whole');
            const price = priceEl ? priceEl.innerText.trim().replace(/[^0-9,]/g, '') : "";

            // Extract Rating
            const ratingEl = container.querySelector('span[aria-label*="stars"], i[class*="a-icon-star"]');
            let rating = "";
            if (ratingEl) {
                const label = ratingEl.getAttribute('aria-label') || ratingEl.innerText || "";
                const match = label.match(/[\d.]+/);
                if (match) rating = match[0];
            }

            // Extract Review Count
            const reviewEl = container.querySelector('span[aria-label*="reviews"], [class*="total-reviews"]');
            let reviewCount = "";
            if (reviewEl) {
                const label = reviewEl.getAttribute('aria-label') || reviewEl.innerText || "";
                reviewCount = label.replace(/[^0-9]/g, '');
            }

            // Only add valid looking products
            if (title && asin && title.length > 5) {
                products.push({
                    title,
                    price,
                    imageUrl,
                    asin, // Storing ASIN instead of full link
                    rating,
                    reviewCount,
                    category: pageCategory
                });
            }
        } catch (e) {
            // Ignore errors for individual items
        }
    });

    // Remove duplicates based on asin
    const final = [];
    const seen = new Set();
    products.forEach(p => {
        if (!seen.has(p.asin)) {
            seen.add(p.asin);
            final.push(p);
        }
    });

    console.log(`Successfully extracted ${final.length} unique products.`);
    console.log(JSON.stringify(final, null, 2));

    // Try to copy to clipboard if permissions allow
    try {
        copy(final);
        console.log("JSON copied to clipboard!");
    } catch (e) {
        console.log("Could not auto-copy. Please manually copy the JSON output above.");
    }

    return final;
})();
