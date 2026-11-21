"use strict";

// ============================================================================
// 1. VARIABLES GLOBALES
// ============================================================================
let lignes = 0;
let total_points = 0;

let persons = [
    { Nom: "Nom1", Prénom: "Prénom1", points: 5 },
    { Nom: "Nom2", Prénom: "Prénom2", points: 10 },
    { Nom: "Nom3", Prénom: "Prénom3", points: 15 }
];

// NOUVEAU (annulation) : mémorise la dernière suppression
// Format : [ { index: position_d_origine, person: objet_supprimé }, ... ] ou null
let lastDeleted = null;

// NOUVEAU : identifiants des minuteries (pour les messages et l'animation)
let messageTimer = null;
let duplicateTimer = null;

// ============================================================================
// 2. INITIALISATION
// ============================================================================
init();

function init() {
    for (let person of persons) {
        doInsert(person.Nom, person.Prénom, person.points);
    }
    updateUndoButton();
}

// ============================================================================
// 3. INSERTION DANS LE TABLEAU
// ============================================================================
function doInsert(Nom, Prénom, points) {
    lignes = lignes + 1;
    total_points = total_points + points;
    let num = lignes;
    doInsertRowTable(num, Nom, Prénom, points);
    update_summary();
}

function doInsertRowTable(num, Nom, Prénom, points) {
    const table = document.querySelector("table");
    const row = document.createElement("tr");
    row.setAttribute("class", "row");

    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    col1.innerText = num;
    col2.innerText = Nom;
    col3.innerText = Prénom;
    col4.innerText = points;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);

    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    row.append(col1, col2, col3, col4, col5);
    table.append(row);
}

// ============================================================================
// 4. RÉSUMÉ + PODIUM
// ============================================================================
function update_summary() {
    let element_lignes = document.getElementById("p1");
    let element_points = document.getElementById("p3");

    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Totale point(s)= " + total_points;

    // NOUVEAU : le podium est recalculé à chaque mise à jour du résumé
    // (ajout, suppression, annulation)
    update_podium();
}

// ============================================================================
// FONCTIONNALITÉ 1 : PODIUM DES 3 MEILLEURS SCORES
// ============================================================================
function update_podium() {
    const podium = document.getElementById("podium");
    podium.innerHTML = "";

    // Aucun score : message par défaut
    if (persons.length === 0) {
        const empty = document.createElement("div");
        empty.setAttribute("class", "podium_empty");
        empty.innerText = "Aucun score pour le moment";
        podium.append(empty);
        return;
    }

    // Copie du tableau (pour ne pas modifier l'ordre de "persons"),
    // tri décroissant sur les points, puis on garde les 3 premiers
    const top3 = [...persons]
        .sort(function (a, b) { return b.points - a.points; })
        .slice(0, 3);

    const medals = ["🥇", "🥈", "🥉"];
    const classes = ["podium_gold", "podium_silver", "podium_bronze"];

    for (let i = 0; i < top3.length; i++) {
        const item = document.createElement("div");
        item.setAttribute("class", "podium_item " + classes[i]);

        const medal = document.createElement("span");
        medal.setAttribute("class", "podium_medal");
        medal.innerText = medals[i];

        const name = document.createElement("span");
        name.setAttribute("class", "podium_name");
        name.innerText = top3[i].Prénom + " " + top3[i].Nom;

        const pts = document.createElement("span");
        pts.setAttribute("class", "podium_points");
        pts.innerText = top3[i].points + " point(s)";

        item.append(medal, name, pts);
        podium.append(item);
    }
}

// ============================================================================
// OUTIL : affichage d'un message temporaire (type : "warning" ou "success")
// ============================================================================
function showMessage(texte, type) {
    const box = document.getElementById("message");
    box.innerText = texte;
    box.setAttribute("class", "msg_" + type);

    clearTimeout(messageTimer);
    messageTimer = setTimeout(function () {
        box.innerText = "";
        box.setAttribute("class", "");
    }, 3500);
}

// ============================================================================
// 5. AJOUT VIA LE FORMULAIRE (avec détection des doublons)
// ============================================================================
function doNewData() {
    const elt_nom = document.getElementById("form_nom");
    const elt_Prénom = document.getElementById("form_Prénom");
    const elt_points = document.getElementById("form_points");

    let Nom = elt_nom.value.trim();
    let Prénom = elt_Prénom.value.trim();
    let points = parseInt(elt_points.value);

    if (Nom === "" || Prénom === "" || Number.isNaN(points)) {
        window.alert("Formulaire incomplet !");
        return;
    }

    // ------------------------------------------------------------------
    // FONCTIONNALITÉ 2 : DÉTECTION DES DOUBLONS
    // Même Nom + même Prénom (sans tenir compte des majuscules/espaces)
    // ------------------------------------------------------------------
    const index = findDuplicate(Nom, Prénom);

    if (index !== -1) {
        highlightDuplicate(index);
        showMessage("Doublon détecté : " + Prénom + " " + Nom + " existe déjà (ligne " + (index + 1) + ").", "warning");
        return; // on n'ajoute pas la personne
    }

    // Pas de doublon : traitement normal
    // (on ajoute d'abord dans "persons" pour que le podium soit à jour)
    persons.push({ Nom: Nom, Prénom: Prénom, points: points });
    doInsert(Nom, Prénom, points);

    elt_nom.value = "";
    elt_Prénom.value = "";
    elt_points.value = "";
}

// Retourne l'index de la personne déjà présente, ou -1 si aucun doublon
function findDuplicate(Nom, Prénom) {
    const n = Nom.trim().toLowerCase();
    const p = Prénom.trim().toLowerCase();

    return persons.findIndex(function (person) {
        return person.Nom.trim().toLowerCase() === n &&
               person.Prénom.trim().toLowerCase() === p;
    });
}

// Anime la ligne existante (clignotement orange + tremblement)
function highlightDuplicate(index) {
    const rows = document.querySelectorAll("#persons_table .row");
    const row = rows[index];
    if (!row) {
        return;
    }

    // Relance l'animation même si elle est déjà en cours
    clearTimeout(duplicateTimer);
    const anciennes = document.querySelectorAll(".row_duplicate");
    for (let r of anciennes) {
        r.classList.remove("row_duplicate");
    }
    void row.offsetWidth; // force le navigateur à recalculer (redémarre l'animation)
    row.classList.add("row_duplicate");

    // Fait défiler la page jusqu'à la ligne si nécessaire
    row.scrollIntoView({ behavior: "smooth", block: "center" });

    // Retire la classe à la fin de l'animation
    duplicateTimer = setTimeout(function () {
        row.classList.remove("row_duplicate");
    }, 2000);
}

// ============================================================================
// 6. SUPPRESSION DES LIGNES SÉLECTIONNÉES (avec mémorisation pour annuler)
// ============================================================================
function deleteRow() {

    if (lignes === 0) {
        window.alert("Le tableau est déjà vide !");
        return;
    }

    const table = document.querySelector("table");
    const checkedBoxes = table.querySelectorAll(".col_chkbox input:checked");

    if (checkedBoxes.length === 0) {
        window.alert("Sélectionnez au moins une ligne !");
        return;
    }

    if (!window.confirm("Voulez-vous vraiment supprimer la (ou les) ligne(s) sélectionnée(s) ?")) {
        return;
    }

    const rows = table.querySelectorAll(".row");

    // NOUVEAU : liste des éléments supprimés pour pouvoir les restaurer
    const deleted = [];

    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input");

        if (checkbox.checked) {
            let points = parseInt(row.cells[3].innerText);
            total_points = total_points - points;
            lignes = lignes - 1;
            row.remove();

            // FONCTIONNALITÉ 3 : on garde la personne et sa position d'origine
            const removed = persons.splice(i, 1)[0];
            deleted.push({ index: i, person: removed });
        }
    }

    // La boucle va de la fin au début : on remet dans l'ordre croissant
    deleted.reverse();
    lastDeleted = deleted;

    // Les lignes restantes doivent être renumérotées (1, 2, 3...)
    renumberRows();

    window.alert("Suppression effectuée avec succès !");
    update_summary();
    updateUndoButton();
}

// ============================================================================
// FONCTIONNALITÉ 3 : ANNULATION DE LA DERNIÈRE SUPPRESSION
// ============================================================================
function undoDelete() {
    if (lastDeleted === null || lastDeleted.length === 0) {
        window.alert("Aucune suppression à annuler !");
        return;
    }

    // Réinsertion dans l'ordre croissant des index d'origine
    // => chaque personne retrouve sa position initiale
    for (let item of lastDeleted) {
        persons.splice(item.index, 0, item.person);
    }

    const nombre = lastDeleted.length;
    lastDeleted = null; // une seule annulation possible (la dernière suppression)

    rebuildTable();
    updateUndoButton();
    showMessage(nombre + " ligne(s) restaurée(s) avec succès.", "success");
}

// Reconstruit entièrement le tableau à partir du tableau "persons"
function rebuildTable() {
    const oldRows = document.querySelectorAll("#persons_table .row");
    for (let r of oldRows) {
        r.remove();
    }

    lignes = 0;
    total_points = 0;

    for (let person of persons) {
        doInsert(person.Nom, person.Prénom, person.points);
    }

    // Cas où "persons" est vide : le résumé et le podium doivent quand même être mis à jour
    update_summary();
}

// Renumérote la colonne N° après une suppression
function renumberRows() {
    const rows = document.querySelectorAll("#persons_table .row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].innerText = i + 1;
    }
}

// Active ou désactive le bouton Annuler selon l'état de lastDeleted
function updateUndoButton() {
    const btn = document.getElementById("btn_undo");
    btn.disabled = (lastDeleted === null || lastDeleted.length === 0);
}

// ============================================================================
// 7. AFFICHAGE DANS LA CONSOLE
// ============================================================================
function consoleTableau() {
    console.log(persons);
}