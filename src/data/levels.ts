export interface Level {
  id: number;
  category: "Type 1" | "Type 2" | "Type 3" | "Type 4" | "Type 5";
  title: string;
  theory: string;
  hint?: string;
  expectedSql: string[]; // Multiple valid answers
  solutionDescription: string;
}

export const levels: Level[] = [
  // --- Type 1 ---
  {
    id: 1,
    category: "Type 1",
    title: "1.1 Afficher les caractéristiques des produits (c’est-à-dire, pour chaque produit, afficher ses caractéristiques).",
    theory: "### 🎓 1.1 Afficher les caractéristiques des produits (c’est-à-dire, pour chaque produit, afficher ses caractéristiques).\n\n**🌟 Introduction**\n\nEn SQL, tout commence par **SELECT** (Sélectionner) et **FROM** (Depuis).\n\n1. **SELECT** : Quelles colonnes je veux voir ? (Quelles informations ?)\n2. **FROM** : De quelle table je tire ces informations ? (Quel fichier ?)\n\nL'étoile `*` est un raccourci magique qui signifie **\"TOUTES les colonnes\"**.\nC'est pratique pour découvrir le contenu d'une table.\n\n**Syntaxe :**\n```sql\nSELECT * FROM NomDeLaTable;\n```\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select * from PRODUIT"],
    solutionDescription: "Solution pour 1.1"
  },
  {
    id: 2,
    category: "Type 1",
    title: "1.2 Afficher la liste des localités dans lesquelles il existe au moins un client.",
    theory: "### 🎓 1.2 Afficher la liste des localités dans lesquelles il existe au moins un client.\n\n**🌟 Introduction**\n\nImaginez une liste d'invités où des noms apparaissent plusieurs fois. Vous voulez la liste des invités uniques, sans doublons.\n\nEn SQL, **DISTINCT** sert exactement à ça : éliminer les lignes qui sont parfaitement identiques dans le résultat.\n\n**Syntaxe :**\n```sql\nSELECT DISTINCT Colonne FROM Table;\n```\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select distinct LOCALITE from CLIENT"],
    solutionDescription: "Solution pour 1.2"
  },
  {
    id: 3,
    category: "Type 1",
    title: "1.3 Afficher le numéro, le nom et la localité des clients de catégorie C1 n’habitant pas à Toulouse.",
    theory: "### 🎓 1.3 Afficher le numéro, le nom et la localité des clients de catégorie C1 n’habitant pas à Toulouse.\n\n**🌟 Introduction**\n\nPour poser des questions plus précises, on combine des conditions :\n- **AND** (ET) : Il faut que *toutes* les conditions soient vraies (ex: Client de Paris ET Compte > 0).\n- **OR** (OU) : Il suffit qu'*une* des conditions soit vraie (ex: Client de Paris OU de Lyon).\n\n**Attention aux priorités !** Comme en mathématiques, le ET est souvent prioritaire sur le OU. Utilisez des parenthèses pour être sûr.\n\n**Exemple :**\n```sql\nWHERE (Ville = 'Paris' OR Ville = 'Lyon') AND Age > 18\n```\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, NOM, LOCALITE from CLIENT where CAT = 'C1' and LOCALITE <> 'Toulouse'"],
    solutionDescription: "Solution pour 1.3"
  },
  {
    id: 4,
    category: "Type 1",
    title: "1.4 Afficher les caractéristiques des produits en acier.",
    theory: "### 🎓 1.4 Afficher les caractéristiques des produits en acier.\n\n**🌟 Introduction**\n\nParfois, on ne cherche pas une valeur exacte (comme \"Egal à 10\"), mais un texte qui *ressemble* à quelque chose.\n\n**LIKE** est votre outil de recherche textuelle. Il fonctionne avec le symbole joker `%` :\n- `'Cha%'` : Tout ce qui **commence** par \"Cha\" (Chat, Chameau...)\n- `'%at'` : Tout ce qui **finit** par \"at\" (Chat, Plat...)\n- `'%a%'` : Tout ce qui **contient** la lettre \"a\" n'importe où.\n\n**Syntaxe :**\n```sql\nSELECT * FROM Table WHERE Colonne LIKE '%Texte%';\n```\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select * from PRODUIT where LIBELLE like '%ACIER%'"],
    solutionDescription: "Solution pour 1.4"
  },
  {
    id: 5,
    category: "Type 1",
    title: "1.5 Donner le numéro, le nom et le compte des clients de Poitiers et de Bruxelles dont le compte est positif.",
    theory: "### 🎓 1.5 Donner le numéro, le nom et le compte des clients de Poitiers et de Bruxelles dont le compte est positif.\n\n**🌟 Introduction**\n\nSi vous voulez filtrer sur plusieurs valeurs possibles (ex: Lundi OU Mardi OU Jeudi), écrire plein de `OR` est fastidieux.\n\n**IN** est une liste de choix. C'est comme dire *\"Est-ce que la valeur est dans ce sac de possibilités ?\"*.\n\n**Syntaxe :**\n```sql\nSELECT * FROM Table WHERE Colonne IN ('Valeur1', 'Valeur2');\n```\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, NOM, COMPTE from CLIENT where LOCALITE in ('Poitiers','Bruxelles') and COMPTE > 0"],
    solutionDescription: "Solution pour 1.5"
  },
  // --- Type 2 ---
  {
    id: 6,
    category: "Type 2",
    title: "1.7 Quelles catégories de clients trouve-t-on à Toulouse ?",
    theory: "### 🎓 1.7 Quelles catégories de clients trouve-t-on à Toulouse ?\n\n**🚀 Niveau Intermédiaire**\n\n**Le piège du NULL** 👻\n\nUne case vide en base de données n'est pas égale à 0 ni à un texte vide. Elle vaut **NULL** (Inconnu).\nOn ne peut pas dire `= NULL` (car \"Est-ce que Inconnu est égal à Inconnu ?\" n'a pas de sens).\n\nOn demande donc :\n- `IS NULL` (Est vide ?)\n- `IS NOT NULL` (N'est pas vide ?)\n\n**Exemple :** Je veux les clients dont le téléphone est renseigné :\n`WHERE Telephone IS NOT NULL`\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select distinct CAT from CLIENT where LOCALITE = 'Toulouse' and CAT is not NULL"],
    solutionDescription: "Solution pour 1.7"
  },
  {
    id: 7,
    category: "Type 2",
    title: "1.8 Afficher le numéro, le nom et la localité des clients dont le nom précède alphabétiquement la localité où ils résident.",
    theory: "### 🎓 1.8 Afficher le numéro, le nom et la localité des clients dont le nom précède alphabétiquement la localité où ils résident.\n\n**🚀 Niveau Intermédiaire**\n\nIci on combine souvent plusieurs tables ou conditions logiques.\nPrenez le temps de décomposer la demande : Qui je veux ? Et quelle condition ils doivent remplir ?\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, NOM, LOCALITE from CLIENT where NOM < LOCALITE"],
    solutionDescription: "Solution pour 1.8"
  },
  {
    id: 8,
    category: "Type 2",
    title: "1.9 Afficher le total, le minimum, la moyenne et le maximum des comptes des clients (compte non tenu des commandes actuelles).",
    theory: "### 🎓 1.9 Afficher le total, le minimum, la moyenne et le maximum des comptes des clients (compte non tenu des commandes actuelles).\n\n**🚀 Niveau Intermédiaire**\n\n**Les Statistiques (Agrégations)**\n\nSQL peut faire des calculs sur toute une colonne d'un coup. C'est comme les formules en bas d'un tableau Excel.\n\n- `COUNT(*)` : Compte le nombre de lignes.\n- `SUM(colonne)` : Fait la somme.\n- `AVG(colonne)` : Fait la moyenne.\n- `MIN` / `MAX` : Le plus petit / le plus grand.\n\n**Astuce :** Donnez un surnom au résultat avec `AS` pour que ce soit plus joli (ex: `SUM(PRIX) AS Total`).\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select sum(COMPTE) as somme, avg(COMPTE) as moyenne, min(COMPTE) as minimum, max(COMPTE) as maximum from CLIENT"],
    solutionDescription: "Solution pour 1.9"
  },
  {
    id: 9,
    category: "Type 2",
    title: "1.10 Afficher les numéros des clients qui commandent le produit de numéro 'CS464'.",
    theory: "### 🎓 1.10 Afficher les numéros des clients qui commandent le produit de numéro 'CS464'.\n\n**🚀 Niveau Intermédiaire**\n\n**Les Sous-requêtes (En cascade)**\n\nParfois l'information se trouve dans une autre table. On fait une \"chasse au trésor\".\n\nExemple : Clients ayant acheté du 'Sapin'.\n1. Je cherche les PRODUITS 'Sapin' -> ça me donne des numéros de produits.\n2. Je cherche les COMMANDES qui contiennent ces numéros -> ça me donne des numéros de commande.\n3. Je cherche les CLIENTS qui ont passé ces commandes.\n\nEn SQL, on imbrique les questions :\n`WHERE ... IN ( SELECT ... WHERE ... IN ( SELECT ... ) )`\n\nC'est comme des poupées russes !\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select distinct NCLI from COMMANDE where NCOM in (select NCOM from DETAIL where NPRO = 'CS464')"],
    solutionDescription: "Solution pour 1.10"
  },
  {
    id: 10,
    category: "Type 2",
    title: "1.11 Afficher les localités des clients qui commandent le produit de numéro 'CS464'.",
    theory: "### 🎓 1.11 Afficher les localités des clients qui commandent le produit de numéro 'CS464'.\n\n**🚀 Niveau Intermédiaire**\n\n**Les Sous-requêtes (En cascade)**\n\nParfois l'information se trouve dans une autre table. On fait une \"chasse au trésor\".\n\nExemple : Clients ayant acheté du 'Sapin'.\n1. Je cherche les PRODUITS 'Sapin' -> ça me donne des numéros de produits.\n2. Je cherche les COMMANDES qui contiennent ces numéros -> ça me donne des numéros de commande.\n3. Je cherche les CLIENTS qui ont passé ces commandes.\n\nEn SQL, on imbrique les questions :\n`WHERE ... IN ( SELECT ... WHERE ... IN ( SELECT ... ) )`\n\nC'est comme des poupées russes !\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select distinct LOCALITE from CLIENT where NCLI in (select NCLI from COMMANDE where NCOM in (select NCOM from DETAIL where NPRO = 'CS464'))"],
    solutionDescription: "Solution pour 1.11"
  },
  {
    id: 11,
    category: "Type 2",
    title: "1.12 Donner le numéro et le nom des clients de Namur qui n'ont pas passé de commandes.",
    theory: "### 🎓 1.12 Donner le numéro et le nom des clients de Namur qui n'ont pas passé de commandes.\n\n**🚀 Niveau Intermédiaire**\n\n**L'Exclusion (NOT IN)**\n\nComment dire \"Je veux tous les clients SAUF ceux qui ont commandé\" ?\n\nOn utilise **NOT IN** avec une sous-requête (une requête dans la requête).\n1. La sous-requête dresse la \"Liste Noire\" (ceux qu'on ne veut pas).\n2. La requête principale filtre ceux qui ne sont **PAS DANS** cette liste.\n\n**Schéma mental :**\n`Je veux les Clients... QUI NE SONT PAS DANS... (La liste des clients de la table Commande)`\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, NOM from CLIENT where NCLI not in (select NCLI from COMMANDE) and LOCALITE = 'Namur'", "select NCLI, NOM from CLIENT where not exists (select * from COMMANDE where NCLI = CLIENT.NCLI) and LOCALITE = 'Namur'"],
    solutionDescription: "Solution pour 1.12"
  },
  {
    id: 12,
    category: "Type 2",
    title: "1.13 Quels sont les produits en sapin qui font l'objet d'une commande ?",
    theory: "### 🎓 1.13 Quels sont les produits en sapin qui font l'objet d'une commande ?\n\n**🚀 Niveau Intermédiaire**\n\n**EXISTS : Y a-t-il au moins un résultat ?**\n\nAu lieu de récupérer une liste de valeurs (comme IN), **EXISTS** vérifie simplement si la sous-requête renvoie quelque chose (Vrai) ou rien (Faux).\n\nC'est souvent utilisé pour dire \"Les clients pour qui *il existe* une commande\".\nC'est une façon très puissante de faire des filtres croisés entre tables.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NPRO from PRODUIT where LIBELLE like '%SAPIN%' and exists (select * from DETAIL where NPRO = PRODUIT.NPRO)", "select NPRO from PRODUIT where LIBELLE like '%SAPIN%' and NPRO in (select NPRO from DETAIL)", "select distinct NPRO from PRODUIT P, DETAIL D where LIBELLE like '%SAPIN%' and P.NPRO = D.NPRO"],
    solutionDescription: "Solution pour 1.13"
  },
  {
    id: 13,
    category: "Type 2",
    title: "1.14 Rechercher les clients qui, s'ils ont un compte négatif, ont passé au moins une commande.",
    theory: "### 🎓 1.14 Rechercher les clients qui, s'ils ont un compte négatif, ont passé au moins une commande.\n\n**🚀 Niveau Intermédiaire**\n\n**Les Sous-requêtes (En cascade)**\n\nParfois l'information se trouve dans une autre table. On fait une \"chasse au trésor\".\n\nExemple : Clients ayant acheté du 'Sapin'.\n1. Je cherche les PRODUITS 'Sapin' -> ça me donne des numéros de produits.\n2. Je cherche les COMMANDES qui contiennent ces numéros -> ça me donne des numéros de commande.\n3. Je cherche les CLIENTS qui ont passé ces commandes.\n\nEn SQL, on imbrique les questions :\n`WHERE ... IN ( SELECT ... WHERE ... IN ( SELECT ... ) )`\n\nC'est comme des poupées russes !\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["Select NCLI from CLIENT WHERE COMPTE>0 OR NCLI in (select NCLI from COMMANDE)"],
    solutionDescription: "Solution pour 1.14"
  },
  {
    id: 14,
    category: "Type 2",
    title: "1.15 Rechercher les autres clients (ceux de 1.14 inverse).",
    theory: "### 🎓 1.15 Rechercher les autres clients (ceux de 1.14 inverse).\n\n**🚀 Niveau Intermédiaire**\n\n**L'Exclusion (NOT IN)**\n\nComment dire \"Je veux tous les clients SAUF ceux qui ont commandé\" ?\n\nOn utilise **NOT IN** avec une sous-requête (une requête dans la requête).\n1. La sous-requête dresse la \"Liste Noire\" (ceux qu'on ne veut pas).\n2. La requête principale filtre ceux qui ne sont **PAS DANS** cette liste.\n\n**Schéma mental :**\n`Je veux les Clients... QUI NE SONT PAS DANS... (La liste des clients de la table Commande)`\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI from CLIENT where COMPTE <0 and NCLI not in (select NCLI from COMMANDE)"],
    solutionDescription: "Solution pour 1.15"
  },
  {
    id: 15,
    category: "Type 2",
    title: "1.16 Rechercher les commandes qui, si elles référencent des produits en sapin, référencent aussi des produits en acier.",
    theory: "### 🎓 1.16 Rechercher les commandes qui, si elles référencent des produits en sapin, référencent aussi des produits en acier.\n\n**🚀 Niveau Intermédiaire**\n\n**L'Exclusion (NOT IN)**\n\nComment dire \"Je veux tous les clients SAUF ceux qui ont commandé\" ?\n\nOn utilise **NOT IN** avec une sous-requête (une requête dans la requête).\n1. La sous-requête dresse la \"Liste Noire\" (ceux qu'on ne veut pas).\n2. La requête principale filtre ceux qui ne sont **PAS DANS** cette liste.\n\n**Schéma mental :**\n`Je veux les Clients... QUI NE SONT PAS DANS... (La liste des clients de la table Commande)`\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCOM from DETAIL where NPRO not in (select NPRO from PRODUIT where LIBELLE like '%SAPIN%') or NPRO in (select NPRO from Produit where LIBELLE like '%ACIER%')"],
    solutionDescription: "Solution pour 1.16"
  },
  {
    id: 16,
    category: "Type 2",
    title: "1.17.1 Clients habitant à Lille ou à Namur.",
    theory: "### 🎓 1.17.1 Clients habitant à Lille ou à Namur.\n\n**🚀 Niveau Intermédiaire**\n\nIci on combine souvent plusieurs tables ou conditions logiques.\nPrenez le temps de décomposer la demande : Qui je veux ? Et quelle condition ils doivent remplir ?\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE from CLIENT where LOCALITE in ('Lille','Namur')"],
    solutionDescription: "Solution pour 1.17.1"
  },
  {
    id: 17,
    category: "Type 2",
    title: "1.17.4 Clients qui n’habitent ni à Lille ni à Namur.",
    theory: "### 🎓 1.17.4 Clients qui n’habitent ni à Lille ni à Namur.\n\n**🚀 Niveau Intermédiaire**\n\n**L'Exclusion (NOT IN)**\n\nComment dire \"Je veux tous les clients SAUF ceux qui ont commandé\" ?\n\nOn utilise **NOT IN** avec une sous-requête (une requête dans la requête).\n1. La sous-requête dresse la \"Liste Noire\" (ceux qu'on ne veut pas).\n2. La requête principale filtre ceux qui ne sont **PAS DANS** cette liste.\n\n**Schéma mental :**\n`Je veux les Clients... QUI NE SONT PAS DANS... (La liste des clients de la table Commande)`\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE from CLIENT where LOCALITE not in ('Lille','Namur')"],
    solutionDescription: "Solution pour 1.17.4"
  },
  {
    id: 18,
    category: "Type 2",
    title: "1.17.6 Clients de catégorie C1 habitant à Namur.",
    theory: "### 🎓 1.17.6 Clients de catégorie C1 habitant à Namur.\n\n**🚀 Niveau Intermédiaire**\n\nIci on combine souvent plusieurs tables ou conditions logiques.\nPrenez le temps de décomposer la demande : Qui je veux ? Et quelle condition ils doivent remplir ?\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE, CAT from CLIENT where CAT = 'C1' and LOCALITE = 'Namur'"],
    solutionDescription: "Solution pour 1.17.6"
  },
  {
    id: 19,
    category: "Type 2",
    title: "1.17.7 Clients de catégorie C1 ou habitant à Namur.",
    theory: "### 🎓 1.17.7 Clients de catégorie C1 ou habitant à Namur.\n\n**🚀 Niveau Intermédiaire**\n\nIci on combine souvent plusieurs tables ou conditions logiques.\nPrenez le temps de décomposer la demande : Qui je veux ? Et quelle condition ils doivent remplir ?\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE, CAT from CLIENT where CAT = 'C1' or LOCALITE = 'Namur'"],
    solutionDescription: "Solution pour 1.17.7"
  },
  {
    id: 20,
    category: "Type 2",
    title: "1.17.8 Clients de catégorie C1 n’habitant pas à Namur.",
    theory: "### 🎓 1.17.8 Clients de catégorie C1 n’habitant pas à Namur.\n\n**🚀 Niveau Intermédiaire**\n\nIci on combine souvent plusieurs tables ou conditions logiques.\nPrenez le temps de décomposer la demande : Qui je veux ? Et quelle condition ils doivent remplir ?\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE, CAT from CLIENT where CAT = 'C1' and LOCALITE <> 'Namur'"],
    solutionDescription: "Solution pour 1.17.8"
  },
  {
    id: 21,
    category: "Type 2",
    title: "1.17.9 Clients qui n’ont pas été sélectionnés dans la question précédente.",
    theory: "### 🎓 1.17.9 Clients qui n’ont pas été sélectionnés dans la question précédente.\n\n**🚀 Niveau Intermédiaire**\n\n**Le piège du NULL** 👻\n\nUne case vide en base de données n'est pas égale à 0 ni à un texte vide. Elle vaut **NULL** (Inconnu).\nOn ne peut pas dire `= NULL` (car \"Est-ce que Inconnu est égal à Inconnu ?\" n'a pas de sens).\n\nOn demande donc :\n- `IS NULL` (Est vide ?)\n- `IS NOT NULL` (N'est pas vide ?)\n\n**Exemple :** Je veux les clients dont le téléphone est renseigné :\n`WHERE Telephone IS NOT NULL`\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE, CAT from CLIENT where CAT <> 'C1' or CAT is NULL or LOCALITE = 'Namur'"],
    solutionDescription: "Solution pour 1.17.9"
  },
  {
    id: 22,
    category: "Type 2",
    title: "1.17.10 Clients soit B1/C1, soit Lille/Namur (inclusive).",
    theory: "### 🎓 1.17.10 Clients soit B1/C1, soit Lille/Namur (inclusive).\n\n**🚀 Niveau Intermédiaire**\n\nIci on combine souvent plusieurs tables ou conditions logiques.\nPrenez le temps de décomposer la demande : Qui je veux ? Et quelle condition ils doivent remplir ?\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE, CAT from CLIENT where CAT in ('B1','C1') or LOCALITE in ('Lille','Namur')"],
    solutionDescription: "Solution pour 1.17.10"
  },
  {
    id: 23,
    category: "Type 2",
    title: "1.17.11 Clients soit B1/C1, soit Lille/Namur (exclusive - XOR).",
    theory: "### 🎓 1.17.11 Clients soit B1/C1, soit Lille/Namur (exclusive - XOR).\n\n**🚀 Niveau Intermédiaire**\n\n**L'Exclusion (NOT IN)**\n\nComment dire \"Je veux tous les clients SAUF ceux qui ont commandé\" ?\n\nOn utilise **NOT IN** avec une sous-requête (une requête dans la requête).\n1. La sous-requête dresse la \"Liste Noire\" (ceux qu'on ne veut pas).\n2. La requête principale filtre ceux qui ne sont **PAS DANS** cette liste.\n\n**Schéma mental :**\n`Je veux les Clients... QUI NE SONT PAS DANS... (La liste des clients de la table Commande)`\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE, CAT from CLIENT where (CAT in ('B1','C1') and LOCALITE not in ('Lille','Namur')) or (CAT not in ('B1','C1') and LOCALITE in ('Lille','Namur'))"],
    solutionDescription: "Solution pour 1.17.11"
  },
  {
    id: 24,
    category: "Type 2",
    title: "1.17.12 Clients B1/C1 ET Lille/Namur.",
    theory: "### 🎓 1.17.12 Clients B1/C1 ET Lille/Namur.\n\n**🚀 Niveau Intermédiaire**\n\nIci on combine souvent plusieurs tables ou conditions logiques.\nPrenez le temps de décomposer la demande : Qui je veux ? Et quelle condition ils doivent remplir ?\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE, CAT from CLIENT where CAT in ('B1','C1') and LOCALITE in ('Lille','Namur')"],
    solutionDescription: "Solution pour 1.17.12"
  },
  {
    id: 25,
    category: "Type 2",
    title: "1.17.13 Clients qui n'ont pas été sélectionnés dans la question précédente (Non A ou Non B).",
    theory: "### 🎓 1.17.13 Clients qui n'ont pas été sélectionnés dans la question précédente (Non A ou Non B).\n\n**🚀 Niveau Intermédiaire**\n\n**L'Exclusion (NOT IN)**\n\nComment dire \"Je veux tous les clients SAUF ceux qui ont commandé\" ?\n\nOn utilise **NOT IN** avec une sous-requête (une requête dans la requête).\n1. La sous-requête dresse la \"Liste Noire\" (ceux qu'on ne veut pas).\n2. La requête principale filtre ceux qui ne sont **PAS DANS** cette liste.\n\n**Schéma mental :**\n`Je veux les Clients... QUI NE SONT PAS DANS... (La liste des clients de la table Commande)`\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, LOCALITE, CAT from CLIENT where CAT not in ('B1','C1') or LOCALITE not in ('Lille','Namur')"],
    solutionDescription: "Solution pour 1.17.13"
  },
  // --- Type 3 ---
  {
    id: 26,
    category: "Type 3",
    title: "1.18 Calculer le montant de chaque détail de commande.",
    theory: "### 🎓 1.18 Calculer le montant de chaque détail de commande.\n\n**🔗 Les Liaisons et Groupes**\n\n**La Jointure (Marier deux tables)** 💍\n\nLes informations sont souvent éclatées. Ex: Le nom du produit est dans `PRODUIT`, la quantité commandée est dans `DETAIL`.\nPour calculer \"Quantité x Prix\", il faut mettre les deux tables ensemble.\n\n**Comment ?**\n1. On liste les tables : `FROM DETAIL, PRODUIT`\n2. On explique le lien : `WHERE DETAIL.NPRO = PRODUIT.NPRO`\n\nC'est comme relier deux points avec un trait : on dit à SQL que le produit N°10 dans la commande correspond au produit N°10 dans le catalogue.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select D.QCOM*P.PRIX as MONTANT from DETAIL D, PRODUIT P where D.NPRO=P.NPRO"],
    solutionDescription: "Solution pour 1.18"
  },
  {
    id: 27,
    category: "Type 3",
    title: "1.19 Afficher la valeur totale des stocks.",
    theory: "### 🎓 1.19 Afficher la valeur totale des stocks.\n\n**🔗 Les Liaisons et Groupes**\n\nApprofondissement des jointures et des agrégations.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select sum(QSTOCK*PRIX) as TOTAL from PRODUIT"],
    solutionDescription: "Solution pour 1.19"
  },
  {
    id: 28,
    category: "Type 3",
    title: "1.20 Calculer le montant commandé des produits en sapin.",
    theory: "### 🎓 1.20 Calculer le montant commandé des produits en sapin.\n\n**🔗 Les Liaisons et Groupes**\n\n**La Jointure (Marier deux tables)** 💍\n\nLes informations sont souvent éclatées. Ex: Le nom du produit est dans `PRODUIT`, la quantité commandée est dans `DETAIL`.\nPour calculer \"Quantité x Prix\", il faut mettre les deux tables ensemble.\n\n**Comment ?**\n1. On liste les tables : `FROM DETAIL, PRODUIT`\n2. On explique le lien : `WHERE DETAIL.NPRO = PRODUIT.NPRO`\n\nC'est comme relier deux points avec un trait : on dit à SQL que le produit N°10 dans la commande correspond au produit N°10 dans le catalogue.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select sum(D.QCOM*P.PRIX) as MONTANT from DETAIL D, PRODUIT P where D.NPRO=P.NPRO and P.LIBELLE like '%SAPIN%'"],
    solutionDescription: "Solution pour 1.20"
  },
  {
    id: 29,
    category: "Type 3",
    title: "1.21.1 Statistiques par catégorie.",
    theory: "### 🎓 1.21.1 Statistiques par catégorie.\n\n**🔗 Les Liaisons et Groupes**\n\n**Découper le gâteau : GROUP BY** 🍰\n\nJusqu'à présent, `SUM` ou `AVG` calculaient un total pour TOUTE la table.\nMais si on veut le total **PAR** ville ? Ou **PAR** catégorie ?\n\nOn utilise **GROUP BY Colonne**.\nCela demande à SQL de :\n1. Regrouper les lignes qui ont la même valeur (ex: tous les Parisiens ensemble).\n2. Faire le calcul (COUNT, SUM...) sur chaque petit tas séparément.\n\n**Règle d'or :** Tout ce qui est dans le `SELECT` (hors calculs) DOIT être dans le `GROUP BY`.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select sum(COMPTE), avg(COMPTE), count(COMPTE) from CLIENT group by CAT"],
    solutionDescription: "Solution pour 1.21.1"
  },
  {
    id: 30,
    category: "Type 3",
    title: "1.21.2 Statistiques par localité.",
    theory: "### 🎓 1.21.2 Statistiques par localité.\n\n**🔗 Les Liaisons et Groupes**\n\n**Découper le gâteau : GROUP BY** 🍰\n\nJusqu'à présent, `SUM` ou `AVG` calculaient un total pour TOUTE la table.\nMais si on veut le total **PAR** ville ? Ou **PAR** catégorie ?\n\nOn utilise **GROUP BY Colonne**.\nCela demande à SQL de :\n1. Regrouper les lignes qui ont la même valeur (ex: tous les Parisiens ensemble).\n2. Faire le calcul (COUNT, SUM...) sur chaque petit tas séparément.\n\n**Règle d'or :** Tout ce qui est dans le `SELECT` (hors calculs) DOIT être dans le `GROUP BY`.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select sum(COMPTE), avg(COMPTE), count(COMPTE) from CLIENT group by LOCALITE"],
    solutionDescription: "Solution pour 1.21.2"
  },
  {
    id: 31,
    category: "Type 3",
    title: "1.21.3 Statistiques par catégorie dans chaque localité.",
    theory: "### 🎓 1.21.3 Statistiques par catégorie dans chaque localité.\n\n**🔗 Les Liaisons et Groupes**\n\n**Découper le gâteau : GROUP BY** 🍰\n\nJusqu'à présent, `SUM` ou `AVG` calculaient un total pour TOUTE la table.\nMais si on veut le total **PAR** ville ? Ou **PAR** catégorie ?\n\nOn utilise **GROUP BY Colonne**.\nCela demande à SQL de :\n1. Regrouper les lignes qui ont la même valeur (ex: tous les Parisiens ensemble).\n2. Faire le calcul (COUNT, SUM...) sur chaque petit tas séparément.\n\n**Règle d'or :** Tout ce qui est dans le `SELECT` (hors calculs) DOIT être dans le `GROUP BY`.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select sum(COMPTE), avg(COMPTE), count(COMPTE) from CLIENT group by LOCALITE, CAT"],
    solutionDescription: "Solution pour 1.21.3"
  },
  {
    id: 32,
    category: "Type 3",
    title: "1.23 Combien y a-t-il de commandes spécifiant un (ou plusieurs) produit(s) en acier ?",
    theory: "### 🎓 1.23 Combien y a-t-il de commandes spécifiant un (ou plusieurs) produit(s) en acier ?\n\n**🔗 Les Liaisons et Groupes**\n\nApprofondissement des jointures et des agrégations.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select count(*) from COMMANDE where NCOM in (select NCOM from DETAIL where NPRO in (select NPRO from PRODUIT where LIBELLE like '%ACIER%'))", "select count(*) from COMMANDE M where NCOM in (select NCOM from DETAIL D, PRODUIT P where D.NPRO = P.NPRO and LIBELLE like '%ACIER%')", "select count(distinct M.NCOM) from COMMANDE M, DETAIL D, PRODUIT P where M.NCOM = D.NCOM and D.NPRO = P.NPRO and LIBELLE like '%ACIER%'"],
    solutionDescription: "Solution pour 1.23"
  },
  {
    id: 33,
    category: "Type 3",
    title: "1.24 Dans combien de localités trouve-t-on des clients de catégorie C1 ?",
    theory: "### 🎓 1.24 Dans combien de localités trouve-t-on des clients de catégorie C1 ?\n\n**🔗 Les Liaisons et Groupes**\n\nApprofondissement des jointures et des agrégations.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select count(distinct LOCALITE) from CLIENT where CAT = 'C1'"],
    solutionDescription: "Solution pour 1.24"
  },
  {
    id: 34,
    category: "Type 3",
    title: "1.25 Créer une table DETAIL_COM et y ranger les détails enrichis.",
    theory: "### 🎓 1.25 Créer une table DETAIL_COM et y ranger les détails enrichis.\n\n**🔗 Les Liaisons et Groupes**\n\n**Copier-Coller des données : INSERT SELECT** 💾\n\nOn peut remplir une table avec le résultat d'une recherche.\n\n`INSERT INTO TableCible (ColA, ColB) SELECT ColA, ColB FROM TableSource...`\n\nC'est très utile pour archiver des données ou créer des tables de reporting.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["insert into DETAIL_COM(NCOM, DATECOM, QCOM, NPRO, PRIX, MONTANT) select M.NCOM, DATECOM, QCOM, P.NPRO, PRIX, QCOM*PRIX from COMMANDE M, DETAIL D, PRODUIT P where M.NCOM=D.NCOM and D.NPRO=P.NPRO"],
    solutionDescription: "Solution pour 1.25"
  },
  {
    id: 35,
    category: "Type 3",
    title: "1.26 Annuler les comptes négatifs des clients de catégorie C1.",
    theory: "### 🎓 1.26 Annuler les comptes négatifs des clients de catégorie C1.\n\n**🔗 Les Liaisons et Groupes**\n\n**Modifier les données : UPDATE** ✏️\n\nAttention, ici on ne pose plus de questions, on change la réalité !\n\nLa commande est :\n`UPDATE Table SET Colonne = NouvelleValeur WHERE Condition`\n\n🚨 **Danger :** Si vous oubliez le `WHERE`, vous modifiez TOUTES les lignes de la table ! (Tout le monde s'appellera \"Toto\"). Soyez prudents.\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["update CLIENT set COMPTE=0 where COMPTE<0 and CAT='C1'"],
    solutionDescription: "Solution pour 1.26"
  },
  // --- Type 4 ---
  {
    id: 36,
    category: "Type 4",
    title: "1.30 Afficher le numéro et le nom des clients qui n’ont pas commandé de produits en sapin.",
    theory: "### 🎓 1.30 Afficher le numéro et le nom des clients qui n’ont pas commandé de produits en sapin.\n\n**🧠 Logique Avancée**\n\nIci on gère des cas particuliers : anomalies de données, cas limites (clients sans commandes que l'on veut quand même afficher avec un zéro, etc.). C'est le niveau \"Expert Métier\".\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, NOM from CLIENT where NCLI not in (select NCLI from COMMANDE where NCOM in (select NCOM from DETAIL where NPRO in (select NPRO from PRODUIT where LIBELLE like '%SAPIN%')))"],
    solutionDescription: "Solution pour 1.30"
  },
  {
    id: 37,
    category: "Type 4",
    title: "1.31 Rechercher les clients qui, s'ils ont commandé le produit PA60, en ont commandé plus de 500 unités au total.",
    theory: "### 🎓 1.31 Rechercher les clients qui, s'ils ont commandé le produit PA60, en ont commandé plus de 500 unités au total.\n\n**🧠 Logique Avancée**\n\nIci on gère des cas particuliers : anomalies de données, cas limites (clients sans commandes que l'on veut quand même afficher avec un zéro, etc.). C'est le niveau \"Expert Métier\".\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI from CLIENT C where NCLI not in (select NCLI from COMMANDE where NCOM in (select NCOM from DETAIL where NPRO='PA60' or (select sum(QCOM) from DETAIL where NCOM in (select NCOM from COMMANDE where NCLI=C.NCLI))>500))"],
    solutionDescription: "Solution pour 1.31"
  },
  {
    id: 38,
    category: "Type 4",
    title: "1.35 Calculer le montant de chaque commande.",
    theory: "### 🎓 1.35 Calculer le montant de chaque commande.\n\n**🧠 Logique Avancée**\n\nIci on gère des cas particuliers : anomalies de données, cas limites (clients sans commandes que l'on veut quand même afficher avec un zéro, etc.). C'est le niveau \"Expert Métier\".\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCOM, sum(QCOM*PRIX) from COMMANDE M, DETAIL D, PRODUIT P where M.NCOM=D.NCOM and D.NPRO=P.NPRO group by NCOM"],
    solutionDescription: "Solution pour 1.35"
  },
  {
    id: 39,
    category: "Type 4",
    title: "1.36 Calculer le montant dû par chaque client (avec 0 si pas de commande).",
    theory: "### 🎓 1.36 Calculer le montant dû par chaque client (avec 0 si pas de commande).\n\n**🧠 Logique Avancée**\n\n**L'Union fait la force** ➕\n\nParfois, une seule requête ne suffit pas. On veut colle bout-à-bout deux listes.\n- Liste 1 : Les clients qui ont payé.\n- Liste 2 : Les clients qui ont une dette.\n\n**UNION** permet de fusionner ces deux résultats.\n**Condition stricte :** Il faut avoir exactement le même nombre de colonnes dans les deux requêtes !\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI, sum(QCOM*PRIX) from CLIENT C, COMMANDE M, DETAIL D, PRODUIT P where C.NCLI=M.NCLI and M.NCOM=D.NCOM and D.NPRO=P.NPRO group by NCLI union select NCLI, 0 from CLIENT C where C.NCLI not in (select NCLI from COMMANDE)"],
    solutionDescription: "Solution pour 1.36"
  },
  {
    id: 40,
    category: "Type 4",
    title: "1.40 Rechercher les anomalies d'intégrité référentielle (Détails sans Commande).",
    theory: "### 🎓 1.40 Rechercher les anomalies d'intégrité référentielle (Détails sans Commande).\n\n**🧠 Logique Avancée**\n\nIci on gère des cas particuliers : anomalies de données, cas limites (clients sans commandes que l'on veut quand même afficher avec un zéro, etc.). C'est le niveau \"Expert Métier\".\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCOM, NPRO from DETAIL D where not exists (select * from COMMANDE where NCOM = D.NCOM)"],
    solutionDescription: "Solution pour 1.40"
  },
  {
    id: 41,
    category: "Type 4",
    title: "1.41 Vérifier que toute commande a au moins un détail (Commandes sans détail).",
    theory: "### 🎓 1.41 Vérifier que toute commande a au moins un détail (Commandes sans détail).\n\n**🧠 Logique Avancée**\n\nIci on gère des cas particuliers : anomalies de données, cas limites (clients sans commandes que l'on veut quand même afficher avec un zéro, etc.). C'est le niveau \"Expert Métier\".\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCOM from COMMANDE M where not exists (select * from DETAIL where NCOM = M.NCOM)"],
    solutionDescription: "Solution pour 1.41"
  },
  {
    id: 42,
    category: "Type 4",
    title: "1.46 Produire une table de couples <X,Y> de clients tels que X et Y habitent dans la même localité.",
    theory: "### 🎓 1.46 Produire une table de couples <X,Y> de clients tels que X et Y habitent dans la même localité.\n\n**🧠 Logique Avancée**\n\nIci on gère des cas particuliers : anomalies de données, cas limites (clients sans commandes que l'on veut quand même afficher avec un zéro, etc.). C'est le niveau \"Expert Métier\".\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select C1.LOCALITE, C1.NCLI, C2.NCLI from CLIENT C1, CLIENT C2 where C1.NCLI<C2.NCLI and C1.LOCALITE = C2.LOCALITE order by C1.LOCALITE, C1.NCLI, C2.NCLI"],
    solutionDescription: "Solution pour 1.46"
  },
  // --- Type 5 ---
  {
    id: 43,
    category: "Type 5",
    title: "1.57 Rechercher les clients qui ont commandé tous les produits.",
    theory: "### 🎓 1.57 Rechercher les clients qui ont commandé tous les produits.\n\n**👑 Le Boss Final : La Division**\n\nLa question \"Qui a tout acheté ?\" est la plus dure en SQL.\n\nSQL ne sait pas dire \"TOUT\". Il sait dire \"IL N'EXISTE PAS\".\nOn reformule donc :\n*\"Je cherche les clients pour lesquels... il n'existe pas de produit... qu'ils n'ont pas commandé.\"*\n\nC'est une double négation. Si vous trouvez un produit que je n'ai pas commandé, alors je n'ai pas \"tout\" commandé.\nSi on ne peut pas trouver un tel produit, alors j'ai tout commandé !\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select NCLI from CLIENT C where not exists (select * from PRODUIT where NPRO not in (select NPRO from DETAIL D, COMMANDE M where D.NCOM=M.NCOM and M.NCLI = C.NCLI))"],
    solutionDescription: "Solution pour 1.57"
  },
  {
    id: 44,
    category: "Type 5",
    title: "1.58 Dans quelles localités a-t-on commandé tous les produits en acier ?",
    theory: "### 🎓 1.58 Dans quelles localités a-t-on commandé tous les produits en acier ?\n\n**👑 Le Boss Final : La Division**\n\nLa question \"Qui a tout acheté ?\" est la plus dure en SQL.\n\nSQL ne sait pas dire \"TOUT\". Il sait dire \"IL N'EXISTE PAS\".\nOn reformule donc :\n*\"Je cherche les clients pour lesquels... il n'existe pas de produit... qu'ils n'ont pas commandé.\"*\n\nC'est une double négation. Si vous trouvez un produit que je n'ai pas commandé, alors je n'ai pas \"tout\" commandé.\nSi on ne peut pas trouver un tel produit, alors j'ai tout commandé !\n\n**🔍 Conseil :** Commencez par identifier la table principale, puis ajoutez les filtres un par un.",
    expectedSql: ["select distinct LOCALITE from CLIENT C where not exists (select * from PRODUIT where LIBELLE like '%ACIER%' and NPRO not in (select NPRO from DETAIL D, COMMANDE M, CLIENT CC where D.NCOM = M.NCOM and M.NCLI = C.NCLI and CC.LOCALITE = C.LOCALITE))"],
    solutionDescription: "Solution pour 1.58"
  },
];
