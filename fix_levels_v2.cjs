const fs = require('fs');
const path = 'src/data/levels.ts';

try {
    let content = fs.readFileSync(path, 'utf8');

    // Regex Explanation:
    // (theory:\s*)       -> Group 1: "theory:" plus whitespace
    // ([\s\S]*?)         -> Group 2: Lazy match of any content (the body)
    // (\s*,\s*expectedSql) -> Group 3: The comma, whitespace, and "expectedSql" key
    const regex = /(theory:\s*)([\s\S]*?)(\s*,\s*expectedSql)/g;

    let count = 0;
    content = content.replace(regex, (match, prefix, rawBody, suffix) => {
        count++;

        let cleaned = rawBody;

        // 1. Trim outer whitespace to find the delimiters
        cleaned = cleaned.trim();

        // 2. Remove start delimiter
        // Ideally should be ` or \`
        if (cleaned.startsWith("\\`")) {
            cleaned = cleaned.substring(2);
        } else if (cleaned.startsWith("`")) {
            cleaned = cleaned.substring(1);
        }

        // 3. Remove end delimiter
        if (cleaned.endsWith("\\`")) {
            cleaned = cleaned.substring(0, cleaned.length - 2);
        } else if (cleaned.endsWith("`")) {
            cleaned = cleaned.substring(0, cleaned.length - 1);
        }

        // 4. Trim again to clean up the content itself
        cleaned = cleaned.trim();

        // 5. Reconstruct with enforced format
        // prefix + ` + \n + content + \n + ` + suffix
        // Note: suffix already contains the comma
        return `${prefix}\`\n${cleaned}\n\`${suffix}`;
    });

    console.log(`Processed ${count} theory blocks.`);
    fs.writeFileSync(path, content);
    console.log("Successfully rewrote levels.ts theory blocks.");
} catch (e) {
    console.error("Error fixing file:", e);
    process.exit(1);
}
