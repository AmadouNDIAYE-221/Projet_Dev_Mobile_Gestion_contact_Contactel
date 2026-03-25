// ============================================================
//  CONTRÔLEUR – js/controllers/ProfilControleur.js
//  Gère la logique de la page profil d'un contact
// ============================================================

const ProfilControleur = {

    /**
     * Affiche le profil d'un contact et navigue vers la page profil.
     * Appelé depuis le clic sur un contact dans la liste.
     *
     * @param {string} nom          - Nom complet du contact
     * @param {string} telephone    - Numéro de téléphone
     * @param {string} email        - Adresse email
     * @param {string} organisation - Nom de l'organisation
     * @param {string} photo        - Chemin vers la photo
     */
    afficherProfil(nom, telephone, email, organisation, photo) {
        // Mémoriser le contact courant dans le modèle
        Contact.contactCourant = { nom, telephone, email, organisation, photo };

        // Déléguer l'affichage à la vue
        VueProfil.afficher(Contact.contactCourant);
    },

    /**
     * Prépare le formulaire pour modifier le contact courant,
     * puis navigue vers la page formulaire.
     */
    modifierContact() {
        if (!Contact.contactCourant) return;

        // Pré-remplir le formulaire avec les données actuelles
        VueFormulaire.preremplir(Contact.contactCourant);

        // Aller à la page formulaire
        $.mobile.changePage('#pageAjout');
    },

    /**
     * Supprime le contact courant après confirmation de l'utilisateur.
     */
    supprimerContact() {
        if (!Contact.contactCourant) return;

        if (!VueProfil.confirmerSuppression()) return;

        Contact.supprimer(
            Contact.contactCourant.nom,
            function() {
                alert('✅ Contact supprimé avec succès !');
                Contact.contactCourant = null;
                $.mobile.changePage('#pageAccueil');
                AccueilControleur.rafraichirListe();
            },
            function(erreur) {
                alert('❌ Erreur lors de la suppression : ' + (erreur.message || erreur.code));
                console.error('Erreur suppression :', erreur);
            }
        );
    },
};
