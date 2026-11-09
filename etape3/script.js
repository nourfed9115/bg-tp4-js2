"use strict"; // Activation du mode strict (exigé dans les consignes du TP, Slide 2 / Cours JS : Mode strict)

// ============================================================================
// 1. DÉCLARATION DES VARIABLES GLOBALES (Slides 19, 20 et 26 du TP)
// ============================================================================

// Au début de script.js : Déclaration de la variable compteur "lignes" initialisée à 0
// (vu dans le cours JS : Déclaration de variables avec let, slide Variables / TP Slide 26)
let lignes = 0;

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
// 3. FONCTIONS D'INSERTION DANS LE TABLEAU (Slides 24 et 26 du TP)
// ============================================================================

// Fonction intermédiaire qui gère le compteur de lignes avant d'insérer dans la table HTML
// (vu dans le cours JS : Fonctions avec paramètres, slide Fonctions / TP Slides 24 et 26)
function doInsert(Nom, Prénom, points) {
    // Incrémenter la variable lignes de 1 (opérateur d'incrémentation ++)
    // (vu dans le cours JS : Opérateurs arithmétiques et d'incrémentation, slide Opérateurs / TP Slide 26)
    lignes = lignes + 1;

    // Affecter la valeur du compteur "lignes" à la variable "num" (au lieu de 99 à la slide 24)
    // (vu dans le cours JS : Affectation de variable, slide Variables / TP Slide 26)
    let num = lignes;

    // Appeler la fonction doInsertRowTable définie à l'étape 2 avec les paramètres appropriés
    // (vu dans le cours JS : Appel de fonction avec arguments, slide Fonctions / TP Slides 24 et 26)
    doInsertRowTable(num, Nom, Prénom, points);
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
// 4. AFFICHAGE DANS LA CONSOLE (Slides 29 et 30 du TP)
// ============================================================================

// Fonction exécutée lors du clic sur le bouton "Console Tableau"
// (vu dans le cours JS : Déclaration de fonction et objet console, slide Introduction / Débogage JS / TP Slide 30)
function consoleTableau() {
    // Affiche le contenu du tableau d'objets "persons" dans la console du navigateur
    // (vu dans le cours JS : méthode console.log(), slide Console et Débogage / TP Slides 29 et 30)
    console.log(persons);
}