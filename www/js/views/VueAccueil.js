// ============================================================
//  VUE – js/views/VueAccueil.js
//  Gère le rendu de la page d'accueil (liste des contacts)
// ============================================================

const VueAccueil = {

    /**
     * Affiche la liste des contacts dans le listview jQuery Mobile.
     * @param {Array} contacts - Tableau de contacts normalisés
     */
    afficherContacts(contacts) {
        const liste = document.getElementById('listeContacts');

        if (contacts.length === 0) {
            liste.innerHTML = `
                <li>
                    <p style="text-align:center; padding:1em; color:#888;">
                        Aucun contact à afficher.
                    </p>
                </li>`;
        } else {
            liste.innerHTML = contacts.map(c => this._genererElementContact(c)).join('');
        }

        // Rafraîchir le widget jQuery Mobile
        try {
            $(liste).listview('refresh');
        } catch (e) {
            // Ignoré au premier rendu
        }
    },

    /**
     * Affiche un message d'erreur dans la liste.
     * @param {string} message - Message d'erreur à afficher
     */
    afficherErreur(message) {
        const liste = document.getElementById('listeContacts');
        liste.innerHTML = `
            <li>
                <p style="text-align:center; padding:1em; color:#c00;">
                    ⚠️ ${message}
                </p>
            </li>`;
        try { $(liste).listview('refresh'); } catch (e) {}
    },

    // ----------------------------------------------------------
    //  Méthode privée de génération HTML
    // ----------------------------------------------------------

    /**
     * Génère le HTML d'un élément de liste pour un contact.
     * @param {Object} contact - Contact normalisé
     * @returns {string} HTML de l'élément <li>
     */
    _genererElementContact(contact) {
        // Échapper les apostrophes pour éviter les erreurs dans onclick
        const nom    = contact.nom.replace(/'/g, "\\'");
        const tel    = contact.telephone.replace(/'/g, "\\'");
        const email  = contact.email.replace(/'/g, "\\'");
        const org    = contact.organisation.replace(/'/g, "\\'");
        const photo  = contact.photo.replace(/'/g, "\\'");

        return `
            <li>
                <a href="#pageProfil"
                   onclick="ProfilControleur.afficherProfil('${nom}','${tel}','${email}','${org}','${photo}')">
                    <img src="${contact.photo}" alt="Photo de ${contact.nom}">
                    <h2>${contact.nom}</h2>
                    <p>${contact.telephone}</p>
                </a>
            </li>`;
    },
};
