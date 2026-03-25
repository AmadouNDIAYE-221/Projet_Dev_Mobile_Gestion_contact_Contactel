// ============================================================
//  VUE – js/views/VueProfil.js
//  Gère le rendu de la page profil d'un contact
// ============================================================

const VueProfil = {

    /**
     * Remplit la page profil avec les données d'un contact.
     * @param {Object} contact - Contact normalisé { nom, telephone, email, organisation, photo }
     */
    afficher(contact) {
        document.getElementById('avatarProfil').src                  = contact.photo;
        document.getElementById('nomProfil').textContent             = contact.nom;
        document.getElementById('telephoneProfil').textContent       = contact.telephone;
        document.getElementById('telephoneDetailProfil').textContent = contact.telephone;
        document.getElementById('emailProfil').textContent           = contact.email;
        document.getElementById('organisationProfil').textContent    = contact.organisation;
    },

    /**
     * Affiche un message de confirmation avant suppression.
     * @returns {boolean} true si l'utilisateur confirme
     */
    confirmerSuppression() {
        return confirm('Voulez-vous vraiment supprimer ce contact ?');
    },
};
