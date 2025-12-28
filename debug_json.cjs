
const fs = require('fs');

try {
    const data = fs.readFileSync('public/data/products.json', 'utf8');
    console.log('File length:', data.length);

    try {
        JSON.parse(data);
        console.log('JSON is valid');
    } catch (e) {
        console.error('JSON Error:', e.message);
        // extract position
        const match = e.message.match(/position (\d+)/);
        if (match) {
            const pos = parseInt(match[1]);
            const start = Math.max(0, pos - 50);
            const end = Math.min(data.length, pos + 50);
            console.log('Context around error:');
            console.log('... ' + data.substring(start, end) + ' ...');
            console.log('    ' + ' '.repeat(pos - start) + '^');
        }
    }

} catch (e) {
    console.error('File read error:', e);
}
