
const fs = require('fs');

const file = 'public/data/products.json';
let data = fs.readFileSync(file, 'utf8');

console.log('Original length:', data.length);

// 1. Convert double backslash-quote to single backslash-quote
// Pattern: 15.6\\" -> 15.6\"
// In Regex: \\\\\" -> \\"
data = data.replace(/15\.6\\+"/g, '15.6\\"');

// 2. Fix the split line
// "Display,\n        2.1" -> "Display, 2.1"
data = data.replace(/Display,\s+2\.1/g, 'Display, 2.1');

// 3. Just in case, general fix for double escaped quotes if any other exist
// But be careful.
// Let's rely on specific fixes first.

// 4. Ensure the features list in that section is correct
// If features was merged into one line: "15.6\\" FHD Display","Weight: 2.1 KG"
// We want "15.6\" FHD Display",\n      "Weight: 2.1 KG"
// But JSON doesn't care about newlines.

fs.writeFileSync(file, data);
console.log('Applied fixes.');

// Validate
try {
    JSON.parse(data);
    console.log('SUCCESS: JSON is valid.');
} catch (e) {
    console.error('Validation FAILED:', e.message);
    // print context
    const match = e.message.match(/position (\d+)/);
    if (match) {
        const pos = parseInt(match[1]);
        const start = Math.max(0, pos - 50);
        const end = Math.min(data.length, pos + 50);
        console.log('Context: ...' + data.substring(start, end) + '...');
        console.log('                     ^');
    }
}
