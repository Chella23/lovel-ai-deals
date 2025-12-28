
const fs = require('fs');
const path = require('path');

try {
    const data = fs.readFileSync('public/data/products.json', 'utf8');
    console.log('File read successfully. Length:', data.length);

    const products = JSON.parse(data);
    console.log('JSON parsed successfully. Count:', products.length);

    products.forEach((p, index) => {
        if (!p.features) {
            console.error(`Product at index ${index} (id: ${p.id}) is missing 'features'`);
        }
        if (!p.images) {
            console.error(`Product at index ${index} (id: ${p.id}) is missing 'images'`);
        }
        if (p.specifications && typeof p.specifications !== 'object') {
            console.error(`Product at index ${index} (id: ${p.id}) has invalid 'specifications'`);
        }
    });

    console.log('Validation complete');

} catch (e) {
    console.error('Error:', e.message);
    if (e instanceof SyntaxError) {
        console.error('Syntax validation failed');
    }
}
