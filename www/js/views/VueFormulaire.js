// ============================================================
//  VUE – js/views/VueFormulaire.js
//  Gère le rendu de la page d'ajout et de de modification d'un contact
// ============================================================
const VueFormulaire = {
    recupererValeurs: function() {
        return {
            nom: document.getElementById('champNom').value.trim(),
            telephone: document.getElementById('champTelephone').value.trim(),
            email: document.getElementById('champEmail').value.trim(),
            organisation: document.getElementById('champOrganisation').value.trim()
        };
    },

    remplirFormulaire: function(contact) {
        document.getElementById('champNom').value = contact.nom || '';
        document.getElementById('champTelephone').value = contact.telephone || '';
        document.getElementById('champEmail').value = contact.email || '';
        document.getElementById('champOrganisation').value = contact.organisation || '';
    },

    viderFormulaire: function() {
        document.getElementById('champNom').value = '';
        document.getElementById('champTelephone').value = '';
        document.getElementById('champEmail').value = '';
        document.getElementById('champOrganisation').value = '';
    }
};