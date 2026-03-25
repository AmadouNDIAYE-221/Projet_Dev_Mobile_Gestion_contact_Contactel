// ============================================================
//  CONTRÔLEUR – js/controllers/FormulaireControleur.js
//  Gère la logique du formulaire ajout / modification
// ============================================================

const FormulaireControleur = {

    /**
     * Valide et enregistre un nouveau contact.
     * Appelé par le bouton "Enregistrer" du formulaire.
     */
    enregistrerContact() {
        // 1. Lire les données du formulaire via la vue
        const donnees = VueFormulaire.lireDonnees();

        // 2. Valider les champs obligatoires
        if (!donnees.nom) {
            VueFormulaire.afficherErreurValidation('Le nom est obligatoire.');
            return;
        }
        if (!donnees.telephone) {
            VueFormulaire.afficherErreurValidation('Le téléphone est obligatoire.');
            return;
        }

        // 3. Déléguer la sauvegarde au modèle
        Contact.enregistrer(
            donnees,
            function() {
                alert('✅ Contact "' + donnees.nom + '" enregistré avec succès !');

                // Réinitialiser le formulaire pour le prochain ajout
                VueFormulaire.reinitialiser();

                // Retourner à l'accueil et rafraîchir la liste
                $.mobile.changePage('#pageAccueil');
                AccueilControleur.rafraichirListe();
            },
            function(erreur) {
                alert('❌ Erreur lors de la sauvegarde : ' + (erreur.message || erreur.code));
                console.error('Erreur sauvegarde :', erreur);
            }
        );
    },
};
