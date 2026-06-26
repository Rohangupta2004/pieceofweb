const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace old var(--blue) with var(--primary)
    content = content.replace(/var\(--blue\)/g, 'var(--primary)');
    // Replace old var(--blue-dark) with var(--primary-light)
    content = content.replace(/var\(--blue-dark\)/g, 'var(--primary-light)');
    // Replace old var(--teal) with var(--secondary)
    content = content.replace(/var\(--teal\)/g, 'var(--secondary)');
    
    // Replace old inline backgrounds in CTA sections
    content = content.replace(/background:linear-gradient\(135deg,#1E3A8A,#2563EB\);/g, 'background:var(--primary);');
    content = content.replace(/background:rgba\(255,255,255,0\.15\);color:#fff;border-color:rgba\(255,255,255,0\.3\);/g, 'background:rgba(255,255,255,0.1);color:var(--surface);border-color:rgba(255,255,255,0.2);');
    
    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Cleanup updated.");
