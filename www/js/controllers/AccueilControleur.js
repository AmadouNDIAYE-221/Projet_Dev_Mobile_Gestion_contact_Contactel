// ============================================================
//  CONTRÔLEUR – js/controllers/AccueilControleur.js
//  Gère la logique de la page d'accueil
// ============================================================

const AccueilControleur = {

    /**
     * Initialise la page d'accueil.
     * Appelé au démarrage de l'application (événement deviceready).
     */
    initialiser() {
        if (navigator.contacts) {
            // Appareil réel : chargement depuis les contacts téléphone
            this.chargerDepuisTelephone();
        } else {
            // Mode navigateur : afficher des contacts statiques de démonstration
            this._afficherContactsDemoNavigateur();
        }
    },

    /**
     * Charge les contacts depuis le téléphone (Android/iOS).
     */
    chargerDepuisTelephone() {
        Contact.chargerDepuisTelephone(
            function(contacts) {
                VueAccueil.afficherContacts(contacts);
            },
            function(erreur) {
                VueAccueil.afficherErreur('Impossible de charger les contacts. Code : ' + erreur.code);
                console.error('Erreur chargement contacts :', erreur);
            }
        );
    },

    /**
     * Charge les contacts depuis l'API distante.
     * Déclenché par le bouton "Charger depuis l'API".
     */
    chargerDepuisAPI() {
        Contact.chargerDepuisAPI(
            function(contacts) {
                VueAccueil.afficherContacts(contacts);
            },
            function(erreur) {
                VueAccueil.afficherErreur('Erreur serveur : ' + erreur.message);
                console.error('Erreur API :', erreur);
            }
        );
    },

    /**
     * Rafraîchit la liste des contacts (utilisé après ajout/suppression).
     */
    rafraichirListe() {
        if (navigator.contacts) {
            this.chargerDepuisTelephone();
        }
    },

    // ----------------------------------------------------------
    //  Méthode privée : contacts statiques de démonstration
    // ----------------------------------------------------------

    _afficherContactsDemoNavigateur() {
        const contactsDemo = [
            {
                nom: 'Ismaïla Sarr',
                telephone: '70 123 45 67',
                email: 'Non renseigné',
                organisation: 'Non renseignée',
                photo: 'img/contact-1.png',
            },
            {
                nom: 'Fatou Mbaye',
                telephone: '75 123 45 67',
                email: 'Non renseigné',
                organisation: 'Non renseignée',
                photo: 'img/contact-3.jpg',
            },
            {
                nom: 'Maimouna Fall',
                telephone: '76 123 45 67',
                email: 'Non renseigné',
                organisation: 'Non renseignée',
                photo: 'img/contact-1.png',
            },
            {
                nom: 'Arona NIANG',
                telephone: '79 800 10 10',
                email: 'niang.arona@gmail.com',
                organisation: 'SENEGAL-7',
                photo: 'img/contact-2.png',
            },
        ];

        VueAccueil.afficherContacts(contactsDemo);
    },
};
