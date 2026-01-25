
const fs = require('fs');
const path = require('path');

const existingPath = path.join(__dirname, 'public/data/products.json');
// Using the raw data provided by the user manually in the prompt/previous edits
const rawNewProducts = [

    {
        "title": "D-Link\nD-Link DIR-615 Wi-fi Ethernet-N300 Single_band 300Mbps Router, Mobile App Support, Router | AP | Repeater | Client Modes(Black)\n₹1,099.00\n₹1,099\n.\n00\nList Price: \n₹1,299.00\nFulfilled\nThis item cannot be shipped to your selected delivery location. Choose a different delivery location.\nSee details",
        "price": "1,099",
        "imageUrl": "https://m.media-amazon.com/images/I/31C9PTrkerL._AC_.jpg",
        "asin": "B0085IATT6",
        "rating": "",
        "reviewCount": "",
        "category": "Electronics"
    },
    {
        "title": "Inditrust\nInditrust Rj45 Rj11 Crimping Tool, double colour grip 150B cutter, KD-1 Professional Punch Down Tool, Network Lan Cable Tester, 9V battery & 25 Pcs RJ45 Connectors Combo Set\n34% off\nLimited time deal",
        "price": "661",
        "imageUrl": "https://m.media-amazon.com/images/I/51ztkKfNguL._AC_.jpg",
        "asin": "B079YW3YX3",
        "rating": "",
        "reviewCount": "",
        "category": "Electronics"
    },
    {
        "title": "Best Seller",
        "price": "509",
        "imageUrl": "https://m.media-amazon.com/images/I/51jNo4QNTNL._AC_.jpg",
        "asin": "B08CSJWWRN",
        "rating": "",
        "reviewCount": "",
        "category": "Electronics"
    }


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
