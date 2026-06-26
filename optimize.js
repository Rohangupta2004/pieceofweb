const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace all <img src=" with <img loading="lazy" src="
    // but avoid double loading="lazy"
    content = content.replace(/<img (?!(?:[^>]*\bloading="lazy"\b))([^>]*)src="/g, '<img loading="lazy" $1src="');
    
    // Remove lazy loading from hero image in index.html
    if (file === 'index.html') {
        content = content.replace('<img loading="lazy" src="dental_doctor_1782434577985.png"', '<img src="dental_doctor_1782434577985.png"');
    }
    
    // Accessibility: make sure all <button> have aria-label if they don't have text (this is a bit harder to regex robustly, we'll just check specific ones if needed)
    // The hamburger has aria-label.

    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Lazy loading applied to HTML files.");
