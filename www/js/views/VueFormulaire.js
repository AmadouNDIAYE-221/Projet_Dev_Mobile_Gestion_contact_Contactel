// ============================================================
//  VUE – js/views/VueFormulaire.js
//  Gère le rendu et la lecture du formulaire ajout/modification
// ============================================================

const VueFormulaire = {

    /**
     * Pré-remplit le formulaire avec les données d'un contact (mode modification).
     * @param {Object} contact - Contact à modifier
     */
    preremplir(contact) {
        document.getElementById('titreFormulaire').textContent = 'Modifier le contact';
        document.getElementById('champNom').value              = contact.nom;
        document.getElementById('champTelephone').value        = contact.telephone;
        document.getElementById('champEmail').value            = contact.email;
        document.getElementById('champOrganisation').value     = contact.organisation;
    },

    /**
     * Vide tous les champs du formulaire (mode ajout).
     */
    reinitialiser() {
        document.getElementById('titreFormulaire').textContent = 'Nouveau contact';
        document.getElementById('champNom').value              = '';
        document.getElementById('champTelephone').value        = '';
        document.getElementById('champEmail').value            = '';
        document.getElementById('champOrganisation').value     = '';
    },

    /**
     * Lit et retourne les valeurs saisies dans le formulaire.
     * @returns {Object} { nom, telephone, email, organisation }
     */
    lireDonnees() {
        return {
            nom:          document.getElementById('champNom').value.trim(),
            telephone:    document.getElementById('champTelephone').value.trim(),
            email:        document.getElementById('champEmail').value.trim(),
            organisation: document.getElementById('champOrganisation').value.trim(),
        };
    },

    /**
     * Affiche un message d'erreur de validation.
     * @param {string} message - Message à afficher
     */
    afficherErreurValidation(message) {
        alert('⚠️ ' + message);
    },
};
