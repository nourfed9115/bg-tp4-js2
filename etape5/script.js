"use strict"; // Activation du mode strict (exigé dans les consignes du TP, Slide 2 / Cours JS : Mode strict)

// ============================================================================
// 1. DÉCLARATION DES VARIABLES GLOBALES (Slides 19, 20, 26 et 36 du TP)
// ============================================================================

// Au début de script.js : Déclaration de la variable compteur "lignes" initialisée à 0
// (vu dans le cours JS : Déclaration de variables avec let, slide Variables / TP Slide 26)
let lignes = 0;

// Au début de script.js : Déclaration d'une variable "total_points" et initialisation à 0
// (vu dans le cours JS : Déclaration de variables avec let, slide Variables / TP Slide 36)
let total_points = 0;

// Déclaration du tableau "persons" contenant des objets "person" (Nom, Prénom, points)
// (vu dans le cours JS : Tableaux [] et Objets littéraux { clé: valeur }, slides Tableaux et Objets / TP Slides 17, 20 et 29)
let persons = [
    { Nom: "Nom1", Prénom: "Prénom1", points: 5 },
    { Nom: "Nom2", Prénom: "Prénom2", points: 10 },
    { Nom: "Nom3", Prénom: "Prénom3", points: 15 }
];

// ============================================================================
// 2. INITIALISATION AU CHARGEMENT DU SCRIPT (Slide 22 du TP)
// ============================================================================

// Appel de la fonction init() au lancement du script
// (vu dans le cours JS : Appel de fonction et Hoisting, slide Fonctions / TP Slide 22)
init();

// Déclaration de la fonction init() qui parcourt le tableau "persons"
// (vu dans le cours JS : Déclaration de fonction, slide Fonctions / TP Slide 22)
function init() {
    // Utilisation de la boucle for..of vue en cours pour parcourir les objets du tableau persons
    // (vu dans le cours JS : Boucle for...of sur les itérables/tableaux, slide Boucles / TP Slide 22)
    for (let person of persons) {
        // Appel de doInsert sur chaque objet en accédant à ses propriétés avec la notation pointée (objet.propriete)
        // (vu dans le cours JS : Accès aux propriétés d'un objet, slide Objets / TP Slide 22)
        doInsert(person.Nom, person.Prénom, person.points);
    }
}

// ============================================================================
// 3. FONCTIONS D'INSERTION DANS LE TABLEAU (Slides 24, 26, 38 et 40 du TP)
// ============================================================================

// Fonction intermédiaire qui met à jour les compteurs (lignes et total_points), insère la ligne et met à jour le résumé
// (vu dans le cours JS : Fonctions avec paramètres, slide Fonctions / TP Slides 24, 26, 38 et 40)
function doInsert(Nom, Prénom, points) {
    // Incrémenter la variable lignes de 1
    // (vu dans le cours JS : Opérateurs arithmétiques, slide Opérateurs / TP Slide 26)
    lignes = lignes + 1;

    // Additionner les points à la variable "total_points"
    // (vu dans le cours JS : Opérateurs arithmétiques et d'affectation, slide Opérateurs / TP Slide 38)
    total_points = total_points + points;

    // Affecter la valeur du compteur "lignes" à la variable "num"
    // (vu dans le cours JS : Affectation de variable, slide Variables / TP Slide 26)
    let num = lignes;

    // Appeler la fonction doInsertRowTable définie à l'étape 2 avec les paramètres appropriés
    // (vu dans le cours JS : Appel de fonction avec arguments, slide Fonctions / TP Slides 24 et 26)
    doInsertRowTable(num, Nom, Prénom, points);

    // Appelez la fonction update_summary() qu'on définira après
    // (vu dans le cours JS : Appel de fonction, slide Fonctions / TP Slide 40)
    update_summary();
}

// Déclaration de la fonction qui insère une ligne dans l'élément Table du DOM (créée à l'Étape 2)
// (vu dans le cours JS : Fonctions avec paramètres, slide Fonctions / TP Slide 15)
function doInsertRowTable(num, Nom, Prénom, points) {

    // Récupérer l'élément tableau via le DOM (vu dans le cours DOM : querySelector, slide Sélecteurs DOM)
    const table = document.querySelector("table");

    // Créer un élément de type tr (ligne de tableau) (vu dans le cours DOM : createElement, slide Création d'éléments)
    const row = document.createElement("tr");

    // Affecter à l'élément row, la valeur "row" à son attribut "class",
    // en utilisant la méthode setAttribute (vu dans le cours DOM : setAttribute, slide Manipulation des attributs)
    row.setAttribute("class", "row");

    // Créer 5 éléments de type td (colonne de tableau) (vu dans le cours DOM : createElement, slide Création d'éléments)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    /*
        Remplir le contenu de chaque colonne avec les paramètres
        de la fonction num, Nom, Prénom, points, en utilisant innerText
        (vu dans le cours DOM : propriété innerText, slide Modification du contenu)
    */
    col1.innerText = num;
    col2.innerText = Nom;
    col3.innerText = Prénom;
    col4.innerText = points;

    // La dernière colonne doit contenir un élément input, dont l'attribut type vaut checkbox
    // (vu dans le cours DOM : createElement, setAttribute et append, slide Manipulation du DOM)
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);

    /*
        En utilisant la méthode setAttribute
        affecter les classes correspondantes pour chaque colonne
        (vu dans le cours DOM : setAttribute, slide Manipulation des attributs)
    */
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // RAJOUTER LES COLONNES A LA LIGNE row avec la méthode append()
    // (vu dans le cours DOM : méthode append, slide Insertion d'éléments dans le DOM)
    row.append(col1, col2, col3, col4, col5);

    // RAJOUTER LA LIGNE row AU TABLEAU table
    // (vu dans le cours DOM : méthode append, slide Insertion d'éléments dans le DOM)
    table.append(row);
}

// ============================================================================
// 4. MISE À JOUR DE L'ESPACE RÉSUMÉ (Slide 42 du TP)
// ============================================================================

// La fonction update_summary() met à jour l'espace du résumé (nombre de lignes et total des points)
// (vu dans le cours DOM : Sélection d'éléments et modification du texte / TP Slide 42)
function update_summary() {
    // Récupérer l'élément id = p1
    // (vu dans le cours DOM : getElementById / querySelector, slide Sélecteurs DOM / TP Slide 42)
    let element_lignes = document.getElementById("p1");

    // Récupérer l'élément id = p3
    // (vu dans le cours DOM : getElementById / querySelector, slide Sélecteurs DOM / TP Slide 42)
    let element_points = document.getElementById("p3");

    // Avec innerText, modifiez le contenu de element_lignes
    // pour afficher le nombre de lignes (variable lignes)
    // (vu dans le cours DOM : propriété innerText et concaténation de chaînes "+", slide Manipulation du DOM / TP Slide 42)
    element_lignes.innerText = lignes + " ligne(s)";

    // Avec innerText, modifiez le contenu de element_points
    // pour afficher le total des points (variable total_points)
    // (vu dans le cours DOM : propriété innerText et concaténation de chaînes "+", slide Manipulation du DOM / TP Slide 42)
    element_points.innerText = "Totale point(s)= " + total_points;
}

// ============================================================================
// 5. AJOUT DE NOUVELLES DONNÉES VIA LE FORMULAIRE (Slides 50, 53 et 55 du TP)
// ============================================================================

// Fonction appelée lors du clic sur le bouton Ajouter du formulaire
// (vu dans le cours DOM : Manipulation des formulaires et attribut value / TP Slides 50, 53 et 55)
function doNewData() {
    // Récupérer l'élément id = form_nom
    // (vu dans le cours DOM : getElementById, slide Sélecteurs DOM / TP Slide 53)
    const elt_nom = document.getElementById("form_nom");

    // Récupérer l'élément id = form_Prénom
    // (vu dans le cours DOM : getElementById, slide Sélecteurs DOM / TP Slide 53)
    const elt_Prénom = document.getElementById("form_Prénom");

    // Récupérer l'élément id = form_points
    // (vu dans le cours DOM : getElementById, slide Sélecteurs DOM / TP Slide 53)
    const elt_points = document.getElementById("form_points");

    // Accéder à l'attribut value de elt_nom et le stocker dans "Nom"
    // (vu dans le cours DOM : propriété .value des champs input, slide Formulaires DOM / TP Slide 53)
    let Nom = elt_nom.value;

    // Accéder à l'attribut value de elt_Prénom et le stocker dans "Prénom"
    // (vu dans le cours DOM : propriété .value des champs input, slide Formulaires DOM / TP Slide 53)
    let Prénom = elt_Prénom.value;

    // Accéder à l'attribut value de elt_points et le stocker dans "points"
    // ATTENTION: il ne faut pas oublier parseInt, qui sert à convertir un texte en entier
    // (vu dans le cours JS : Conversion de types avec parseInt(), slide Types et Conversions / TP Slide 53)
    let points = parseInt(elt_points.value);

    // Pour une saisie contrôlée, doNewData() vérifie qu'aucun champ de saisie n'est vide
    // Aide : pour points, utilisation de Number.isNaN(points) qui retourne true si l'entier est vide, false sinon
    // (vu dans le cours JS : Structure conditionnelle if...else et opérateur logique OU "||", slide Conditions / TP Slide 55)
    if (Nom === "" || Prénom === "" || Number.isNaN(points)) {
        // Corps du if : utiliser la méthode alert de window pour afficher le message "Formulaire incomplet !"
        // (vu dans le cours JS/BOM : objet window et méthode window.alert(), slide Boîtes de dialogue / TP Slide 55)
        window.alert("Formulaire incomplet !");
    } else {
        // Corps du else : Faire le traitement normal d'ajout [TP Slide 55]

        // Appeler doInsert avec les nouvelles données récupérées
        // (vu dans le cours JS : Appel de fonction avec arguments, slide Fonctions / TP Slide 53)
        doInsert(Nom, Prénom, points);

        // Insérer également les nouvelles données dans le tableau "persons"
        // (vu dans le cours JS : Méthode push() des tableaux et création d'objet littéral, slides Tableaux et Objets / TP Slide 53)
        persons.push({ Nom: Nom, Prénom: Prénom, points: points });

        // En manipulant les éléments elt_nom, elt_Prénom, elt_points
        // Remettre leur contenu à vide (attribut value) pour préparer une autre saisie
        // (vu dans le cours DOM : modification de la propriété .value, slide Formulaires DOM / TP Slide 53)
        elt_nom.value = "";
        elt_Prénom.value = "";
        elt_points.value = "";
    }
}

// ============================================================================
// 6. AFFICHAGE DANS LA CONSOLE (Slides 29, 30 et 57 du TP)
// ============================================================================

// Fonction exécutée lors du clic sur le bouton "Console Tableau"
// (vu dans le cours JS : Déclaration de fonction et objet console, slide Introduction / Débogage JS / TP Slide 30)
function consoleTableau() {
    // Affiche le contenu du tableau d'objets "persons" dans la console du navigateur
    // (vu dans le cours JS : méthode console.log(), slide Console et Débogage / TP Slides 29, 30 et 57)
    console.log(persons);
}