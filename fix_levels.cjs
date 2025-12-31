const fs = require('fs');
const path = 'src/data/levels.ts';

try {
    let content = fs.readFileSync(path, 'utf8');

    // Replace the start delimiter: theory: \` -> theory: `
    content = content.replace(/theory: \\`/g, 'theory: `');

    // Replace the end delimiter: \`, -> `,
    content = content.replace(/\\`,/g, '`,');

    fs.writeFileSync(path, content);
    console.log("Successfully fixed delimiters in levels.ts");
} catch (e) {
    console.error("Error fixing file:", e);
    process.exit(1);
}
