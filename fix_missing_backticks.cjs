const fs = require('fs');
const path = 'src/data/levels.ts';

try {
    let content = fs.readFileSync(path, 'utf8');

    // Regex to find:
    // Any char that is NOT a backtick
    // Followed by optional whitespace/newlines
    // Followed by a comma
    // Followed by optional whitespace/newlines
    // Followed by "expectedSql"

    // We want to insert a backtick before the comma.
    // The previous capture group $1 is the non-backtick char.
    // We replace with $1 + backtick + the rest.

    // Note: We use [\s\S] approach or dotAll if needed, but here we target specific sequence.
    // "expectedSql" is the reliable anchor.

    content = content.replace(/([^`])(\s*,\s*expectedSql)/g, "$1`$2");

    fs.writeFileSync(path, content);
    console.log("Successfully restored missing backticks in levels.ts");
} catch (e) {
    console.error("Error fixing file:", e);
    process.exit(1);
}
