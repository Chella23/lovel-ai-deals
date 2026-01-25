
const fs = require('fs');
const path = require('path');

const existingPath = path.join(__dirname, 'public/data/products.json');
// Using the raw data provided by the user manually in the prompt/previous edits
const rawNewProducts = [

];

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function processProducts() {
    let existingProducts = [];
    try {
        const data = fs.readFileSync(existingPath, 'utf8');
        existingProducts = JSON.parse(data);
    } catch (err) {
        console.error('Error reading existing products:', err);
        existingProducts = [];
    }

    // Determine the next ID max
    let nextId = existingProducts.length > 0 ? Math.max(...existingProducts.map(p => p.id)) + 1 : 1;

    const newProducts = rawNewProducts.map(raw => {
        // Generate valid slug
        const slug = slugify(raw.title).substring(0, 100);

        // Parse price
        const priceStr = raw.price.replace(/,/g, '');
        const price = parseFloat(priceStr) || 0;

        // Parse rating and reviews (if available, otherwise 0)
        const rating = parseFloat(raw.rating) || 0;
        const reviews = parseInt(raw.reviewCount) || 0;

        // Handle ASIN or extract from link if provided using old format
        let asin = raw.asin || "";
        if (!asin && raw.link) {
            const match = raw.link.match(/(?:\/dp\/|\/gp\/product\/|(?<!\/)\/)([A-Z0-9]{10})(?:$|\/|\?)/);
            if (match) asin = match[1];
        }

        return {
            id: nextId++,
            name: raw.title,
            slug: slug,
            slug: slug,
            category: raw.category || "Electronics", // Use extracted category or fallback
            price: price,
            originalPrice: price,
            rating: rating,
            reviews: reviews,
            image: raw.imageUrl,
            images: [raw.imageUrl],
            inStock: true,
            featured: false,
            asin: asin,
            description: raw.title,
            features: []
        };
    });

    // Filter out duplicates based on asin
    const existingAsins = new Set(existingProducts.map(p => p.asin));
    const uniqueNewProducts = newProducts.filter(p => !existingAsins.has(p.asin));

    const combinedProducts = [...existingProducts, ...uniqueNewProducts];

    fs.writeFileSync(existingPath, JSON.stringify(combinedProducts, null, 2));
    console.log(`Added ${uniqueNewProducts.length} new products. Total products: ${combinedProducts.length}`);
}

processProducts();
