const fs = require('fs');
const path = require('path');

const curriculum = require('./src/data/curriculum.json');

// Helper to generate pedagogical theory based on SQL keywords and context
function generateTheory(title, answers, category) {
    const sql = answers[0].toLowerCase();
    let explanation = `### 🎓 ${title}\n\n`;

    // --- TYPE 1: The Basics (Select, From, Where) ---
    if (category === "Type 1") {
        explanation += `**🌟 Introduction**\n\n`;
        if (sql.includes('distinct')) {
            explanation += `Imaginez une liste d'invités où des noms apparaissent plusieurs fois. Vous voulez la liste des invités uniques, sans doublons.\n\n` +
                `En SQL, **DISTINCT** sert exactement à ça : éliminer les lignes qui sont parfaitement identiques dans le résultat.\n\n` +
                `**Syntaxe :**\n\`\`\`sql\nSELECT DISTINCT Colonne FROM Table;\n\`\`\``;
        } else if (sql.includes('where') && sql.includes('like')) {
            explanation += `Parfois, on ne cherche pas une valeur exacte (comme "Egal à 10"), mais un texte qui *ressemble* à quelque chose.\n\n` +
                `**LIKE** est votre outil de recherche textuelle. Il fonctionne avec le symbole joker \`%\` :\n` +
                `- \`'Cha%'\` : Tout ce qui **commence** par "Cha" (Chat, Chameau...)\n` +
                `- \`'%at'\` : Tout ce qui **finit** par "at" (Chat, Plat...)\n` +
                `- \`'%a%'\` : Tout ce qui **contient** la lettre "a" n'importe où.\n\n` +
                `**Syntaxe :**\n\`\`\`sql\nSELECT * FROM Table WHERE Colonne LIKE '%Texte%';\n\`\`\``;
        } else if (sql.includes('where') && sql.includes('in')) {
            explanation += `Si vous voulez filtrer sur plusieurs valeurs possibles (ex: Lundi OU Mardi OU Jeudi), écrire plein de \`OR\` est fastidieux.\n\n` +
                `**IN** est une liste de choix. C'est comme dire *"Est-ce que la valeur est dans ce sac de possibilités ?"*.\n\n` +
                `**Syntaxe :**\n\`\`\`sql\nSELECT * FROM Table WHERE Colonne IN ('Valeur1', 'Valeur2');\n\`\`\``;
        } else if (sql.includes('where') && (sql.includes('and') || sql.includes('or'))) {
            explanation += `Pour poser des questions plus précises, on combine des conditions :\n` +
                `- **AND** (ET) : Il faut que *toutes* les conditions soient vraies (ex: Client de Paris ET Compte > 0).\n` +
                `- **OR** (OU) : Il suffit qu'*une* des conditions soit vraie (ex: Client de Paris OU de Lyon).\n\n` +
                `**Attention aux priorités !** Comme en mathématiques, le ET est souvent prioritaire sur le OU. Utilisez des parenthèses pour être sûr.\n\n` +
                `**Exemple :**\n\`\`\`sql\nWHERE (Ville = 'Paris' OR Ville = 'Lyon') AND Age > 18\n\`\`\``;
        } else if (sql.includes('where')) {
            explanation += `Le **WHERE** est le filtre. C'est l'équivalent du "Filtre" dans Excel.\n` +
                `Il permet de ne garder que les lignes qui vous intéressent.\n\n` +
                `On utilise des comparateurs :\n` +
                `- \`=\` : Egal\n` +
                `- \`<>\` : Différent\n` +
                `- \`>\`, \`<\`, \`>=\`, \`<=\` : Plus grand, plus petit...\n\n` +
                `**Syntaxe :**\n\`\`\`sql\nSELECT Colonne FROM Table WHERE Condition;\n\`\`\``;
        } else if (sql === "select * from produit") { // Specific check for the very first exercise if possible, or simple select
            explanation += `En SQL, tout commence par **SELECT** (Sélectionner) et **FROM** (Depuis).\n\n` +
                `1. **SELECT** : Quelles colonnes je veux voir ? (Quelles informations ?)\n` +
                `2. **FROM** : De quelle table je tire ces informations ? (Quel fichier ?)\n\n` +
                `L'étoile \`*\` est un raccourci magique qui signifie **"TOUTES les colonnes"**.\n` +
                `C'est pratique pour découvrir le contenu d'une table.\n\n` +
                `**Syntaxe :**\n\`\`\`sql\nSELECT * FROM NomDeLaTable;\n\`\`\``;
        } else {
            explanation += `Utilisez **SELECT** pour choisir les colonnes et **FROM** pour choisir la table.\n` +
                `Séparez les noms de colonnes par des virgules.`;
        }
    }

    // --- TYPE 2: Intermediate (Null, Aggregates, Subqueries) ---
    else if (category === "Type 2") {
        explanation += `**🚀 Niveau Intermédiaire**\n\n`;
        if (sql.includes('is not null') || sql.includes('is null')) {
            explanation += `**Le piège du NULL** 👻\n\n` +
                `Une case vide en base de données n'est pas égale à 0 ni à un texte vide. Elle vaut **NULL** (Inconnu).\n` +
                `On ne peut pas dire \`= NULL\` (car "Est-ce que Inconnu est égal à Inconnu ?" n'a pas de sens).\n\n` +
                `On demande donc :\n` +
                `- \`IS NULL\` (Est vide ?)\n` +
                `- \`IS NOT NULL\` (N'est pas vide ?)\n\n` +
                `**Exemple :** Je veux les clients dont le téléphone est renseigné :\n\`WHERE Telephone IS NOT NULL\``;
        } else if (sql.includes('sum') || sql.includes('avg') || sql.includes('max')) {
            explanation += `**Les Statistiques (Agrégations)**\n\n` +
                `SQL peut faire des calculs sur toute une colonne d'un coup. C'est comme les formules en bas d'un tableau Excel.\n\n` +
                `- \`COUNT(*)\` : Compte le nombre de lignes.\n` +
                `- \`SUM(colonne)\` : Fait la somme.\n` +
                `- \`AVG(colonne)\` : Fait la moyenne.\n` +
                `- \`MIN\` / \`MAX\` : Le plus petit / le plus grand.\n\n` +
                `**Astuce :** Donnez un surnom au résultat avec \`AS\` pour que ce soit plus joli (ex: \`SUM(PRIX) AS Total\`).`;
        } else if (sql.includes('not in') && sql.includes('select')) {
            explanation += `**L'Exclusion (NOT IN)**\n\n` +
                `Comment dire "Je veux tous les clients SAUF ceux qui ont commandé" ?\n\n` +
                `On utilise **NOT IN** avec une sous-requête (une requête dans la requête).\n` +
                `1. La sous-requête dresse la "Liste Noire" (ceux qu'on ne veut pas).\n` +
                `2. La requête principale filtre ceux qui ne sont **PAS DANS** cette liste.\n\n` +
                `**Schéma mental :**\n` +
                `\`Je veux les Clients... QUI NE SONT PAS DANS... (La liste des clients de la table Commande)\``;
        } else if (sql.includes('in (select') || sql.includes('in(select')) {
            explanation += `**Les Sous-requêtes (En cascade)**\n\n` +
                `Parfois l'information se trouve dans une autre table. On fait une "chasse au trésor".\n\n` +
                `Exemple : Clients ayant acheté du 'Sapin'.\n` +
                `1. Je cherche les PRODUITS 'Sapin' -> ça me donne des numéros de produits.\n` +
                `2. Je cherche les COMMANDES qui contiennent ces numéros -> ça me donne des numéros de commande.\n` +
                `3. Je cherche les CLIENTS qui ont passé ces commandes.\n\n` +
                `En SQL, on imbrique les questions :\n` +
                `\`WHERE ... IN ( SELECT ... WHERE ... IN ( SELECT ... ) )\`\n\n` +
                `C'est comme des poupées russes !`;
        } else if (sql.includes('exists')) {
            explanation += `**EXISTS : Y a-t-il au moins un résultat ?**\n\n` +
                `Au lieu de récupérer une liste de valeurs (comme IN), **EXISTS** vérifie simplement si la sous-requête renvoie quelque chose (Vrai) ou rien (Faux).\n\n` +
                `C'est souvent utilisé pour dire "Les clients pour qui *il existe* une commande".\n` +
                `C'est une façon très puissante de faire des filtres croisés entre tables.`;
        } else {
            explanation += `Ici on combine souvent plusieurs tables ou conditions logiques.\nPrenez le temps de décomposer la demande : Qui je veux ? Et quelle condition ils doivent remplir ?`;
        }
    }

    // --- TYPE 3: Joins & Groups ---
    else if (category === "Type 3") {
        explanation += `**🔗 Les Liaisons et Groupes**\n\n`;
        if (sql.includes('group by')) {
            explanation += `**Découper le gâteau : GROUP BY** 🍰\n\n` +
                `Jusqu'à présent, \`SUM\` ou \`AVG\` calculaient un total pour TOUTE la table.\n` +
                `Mais si on veut le total **PAR** ville ? Ou **PAR** catégorie ?\n\n` +
                `On utilise **GROUP BY Colonne**.\n` +
                `Cela demande à SQL de :\n` +
                `1. Regrouper les lignes qui ont la même valeur (ex: tous les Parisiens ensemble).\n` +
                `2. Faire le calcul (COUNT, SUM...) sur chaque petit tas séparément.\n\n` +
                `**Règle d'or :** Tout ce qui est dans le \`SELECT\` (hors calculs) DOIT être dans le \`GROUP BY\`.`;
        } else if (sql.includes('update')) {
            explanation += `**Modifier les données : UPDATE** ✏️\n\n` +
                `Attention, ici on ne pose plus de questions, on change la réalité !\n\n` +
                `La commande est :\n` +
                `\`UPDATE Table SET Colonne = NouvelleValeur WHERE Condition\`\n\n` +
                `🚨 **Danger :** Si vous oubliez le \`WHERE\`, vous modifiez TOUTES les lignes de la table ! (Tout le monde s'appellera "Toto"). Soyez prudents.`;
        } else if (sql.includes('insert')) {
            explanation += `**Copier-Coller des données : INSERT SELECT** 💾\n\n` +
                `On peut remplir une table avec le résultat d'une recherche.\n\n` +
                `\`INSERT INTO TableCible (ColA, ColB) SELECT ColA, ColB FROM TableSource...\`\n\n` +
                `C'est très utile pour archiver des données ou créer des tables de reporting.`;
        } else if (sql.match(/from.*,.*where.*=.*/)) { // Implicit join detection
            explanation += `**La Jointure (Marier deux tables)** 💍\n\n` +
                `Les informations sont souvent éclatées. Ex: Le nom du produit est dans \`PRODUIT\`, la quantité commandée est dans \`DETAIL\`.\n` +
                `Pour calculer "Quantité x Prix", il faut mettre les deux tables ensemble.\n\n` +
                `**Comment ?**\n` +
                `1. On liste les tables : \`FROM DETAIL, PRODUIT\`\n` +
                `2. On explique le lien : \`WHERE DETAIL.NPRO = PRODUIT.NPRO\`\n\n` +
                `C'est comme relier deux points avec un trait : on dit à SQL que le produit N°10 dans la commande correspond au produit N°10 dans le catalogue.`;
        } else {
            explanation += `Approfondissement des jointures et des agrégations.`;
        }
    }

    // --- TYPE 4: Logic Expert ---
    else if (category === "Type 4") {
        explanation += `**🧠 Logique Avancée**\n\n`;
        if (sql.includes('union')) {
            explanation += `**L'Union fait la force** ➕\n\n` +
                `Parfois, une seule requête ne suffit pas. On veut colle bout-à-bout deux listes.\n` +
                `- Liste 1 : Les clients qui ont payé.\n` +
                `- Liste 2 : Les clients qui ont une dette.\n\n` +
                `**UNION** permet de fusionner ces deux résultats.\n` +
                `**Condition stricte :** Il faut avoir exactement le même nombre de colonnes dans les deux requêtes !`;
        } else if (sql.includes('not exists') && (sql.match(/not exists/g) || []).length > 2) { // Trying to catch triple nested or very complex logic
            explanation += `**Inception de Négations** 🤯\n\n` +
                `Nous entrons dans la logique pure. "Je veux ceux qui n'ont pas... de ligne qui n'a pas..."\n` +
                `Prenez un papier et un crayon pour dessiner les ensembles.\n` +
                `C'est normal de trouver ça difficile !`;
        } else if (answers[1] && answers[1].toLowerCase().includes('c1.ncli < c2.ncli')) {
            explanation += `**L'Auto-Jointure (Miroir)** 🪞\n\n` +
                `Comment comparer une table avec elle-même ? (Ex: trouver deux clients dans la même ville).\n\n` +
                `On imagine qu'on a **deux copies** de la même table, et on leur donne des noms différents (alias) :\n` +
                `\`FROM CLIENT C1, CLIENT C2\`\n\n` +
                `Ensuite on compare : \`WHERE C1.LOCALITE = C2.LOCALITE\`\n` +
                `Et pour éviter de dire "Paul est dans la même ville que Paul", on ajoute \`AND C1.NCLI <> C2.NCLI\`.`;
        } else {
            explanation += `Ici on gère des cas particuliers : anomalies de données, cas limites (clients sans commandes que l'on veut quand même afficher avec un zéro, etc.). C'est le niveau "Expert Métier".`;
        }
    }

    // --- TYPE 5: Abstract Logic ---
    else if (category === "Type 5") {
        if (sql.includes('not exists') && sql.includes('not in')) {
            explanation += `**👑 Le Boss Final : La Division**\n\n` +
                `La question "Qui a tout acheté ?" est la plus dure en SQL.\n\n` +
                `SQL ne sait pas dire "TOUT". Il sait dire "IL N'EXISTE PAS".\n` +
                `On reformule donc :\n` +
                `*"Je cherche les clients pour lesquels... il n'existe pas de produit... qu'ils n'ont pas commandé."*\n\n` +
                `C'est une double négation. Si vous trouvez un produit que je n'ai pas commandé, alors je n'ai pas "tout" commandé.\n` +
                `Si on ne peut pas trouver un tel produit, alors j'ai tout commandé !`;
        } else if (sql.includes('havin')) {
            explanation += `**Filtres avancés sur groupes**\n\n` +
                `Ici on mélange \`GROUP BY\` et conditions complexes. On analyse des ensembles de données pour trouver des comportements spécifiques (ex: commander dans toutes les villes).`;
        } else {
            explanation += `Problèmes complexes de logique ensembliste.`;
        }
    }

    explanation += `\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.`;

    return explanation;
}



let output = `export interface Level {
  id: number;
  category: "Type 1" | "Type 2" | "Type 3" | "Type 4" | "Type 5";
  title: string;
  theory: string;
  hint?: string;
  expectedSql: string[]; // Multiple valid answers
  solutionDescription: string;
}

export const levels: Level[] = [
`;

let globalId = 1;

curriculum.forEach(section => {
    output += `  // --- ${section.section} ---\n`;

    section.items.forEach(item => {
        // Sanitize strings for inclusion in code
        // We use JSON.stringify to safely escape the string content, 
        // then slice off the surrounding quotes to put it inside our backticks if we wanted,
        // BUT here we will just output standard JS object properties.

        const category = section.section;
        const theory = generateTheory(item.id + " " + item.question, item.answers, category);

        // Escape backticks in theory if any (rare in my generator but possible in code blocks)
        // Actually, JSON.stringify is safest for the string value.
        const safeTitle = JSON.stringify(item.id + " " + item.question);
        const safeTheory = JSON.stringify(theory); // This adds double quotes around it.
        const safeDesc = JSON.stringify("Solution pour " + item.id);
        // section is "Type 1", "Type 2"... so fits the category type exactly.

        // Safe Expected SQL array
        const sqlArray = item.answers.map(ans => JSON.stringify(ans)).join(', ');

        output += `  {
    id: ${globalId++},
    category: "${category}",
    title: ${safeTitle},
    theory: ${safeTheory},
    expectedSql: [${sqlArray}],
    solutionDescription: ${safeDesc}
  },\n`;
    });
});

output += `];\n`;

try {
    fs.writeFileSync(path.join(__dirname, 'src/data/levels.ts'), output);
    console.log("Successfully generated levels.ts");
} catch (e) {
    console.error(e);
}
