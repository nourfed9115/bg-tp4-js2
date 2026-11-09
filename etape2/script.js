"use strict"; // Activation du mode strict (exigé dans les spécifications, Slide 2)

// Déclaration d'une fonction avec paramètres (vu dans le cours JS, slide Fonctions)
function doInsertRowTable(num, Nom, Prénom, points) {

    // Récupérer l'élément tableau via le DOM (vu dans le cours DOM : querySelector / getElementsByTagName, slide Sélecteurs DOM)
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