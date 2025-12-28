
import { readFileSync } from 'fs';
import { join } from 'path';

try {
    const data = readFileSync('public/data/products.json', 'utf8');
    const products = JSON.parse(data);

    if (!Array.isArray(products)) {
        console.error('Root is not an array');
        process.exit(1);
    }

    products.forEach((p, index) => {
        if (!p.features) {
            console.error(`Product at index ${index} (id: ${p.id}) is missing 'features'`);
        } else if (!Array.isArray(p.features)) {
            console.error(`Product at index ${index} (id: ${p.id}) 'features' is not an array`);
        }

        if (!p.images) {
            console.error(`Product at index ${index} (id: ${p.id}) is missing 'images'`);
        }
    });

    console.log('Validation complete');

} catch (e) {
    console.error(e);
}
