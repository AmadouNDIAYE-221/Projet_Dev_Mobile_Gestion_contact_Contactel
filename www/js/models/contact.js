// ============================================================
//  MODÈLE – js/models/Contact.js
//  Représente un contact et ses données
// ============================================================

const Contact = {

    // Contact actuellement sélectionné (partagé entre contrôleurs)
    contactCourant: null,

    // URL de l'API distante
    URL_API: "http://localhost/contactel/listerContacts.php",

    /**
     * Crée un objet contact normalisé à partir de données brutes.
     * Fonctionne aussi bien avec les contacts Cordova qu'avec l'API.
     * @param {Object} donnees - Données brutes du contact
     * @returns {Object} Contact normalisé
     */
    creerDepuisDonnees(donnees) {
        return {
            nom:          donnees.displayName || donnees.nom || 'Inconnu',
            telephone:    this._extraireTelephone(donnees),
            email:        this._extraireEmail(donnees),
            organisation: this._extraireOrganisation(donnees),
            photo:        this._extrairePhoto(donnees),
        };
    },

    /**
     * Récupère tous les contacts depuis le téléphone (Cordova).
     * @param {Function} succes  - Callback appelé avec le tableau de contacts
     * @param {Function} erreur  - Callback appelé en cas d'erreur
     */
    chargerDepuisTelephone(succes, erreur) {
        if (!navigator.contacts) {
            erreur({ code: 0, message: 'navigator.contacts indisponible (mode navigateur)' });
            return;
        }

        const options = new ContactFindOptions();
        options.multiple       = true;
        options.hasPhoneNumber = true;

        navigator.contacts.find(['*'], function(contacts) {
            const contactsNormalises = contacts.map(c => Contact.creerDepuisDonnees(c));
            succes(contactsNormalises);
        }, erreur, options);
    },

    /**
     * Récupère tous les contacts depuis l'API distante.
     * @param {Function} succes  - Callback appelé avec le tableau de contacts
     * @param {Function} erreur  - Callback appelé en cas d'erreur
     */
    chargerDepuisAPI(succes, erreur) {
        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
            try {
                const contacts = JSON.parse(xhr.responseText);
                const contactsNormalises = contacts.map(c => Contact.creerDepuisDonnees(c));
                succes(contactsNormalises);
            } catch (e) {
                erreur({ message: 'Réponse API invalide' });
            }
        };

        xhr.onerror = function() {
            erreur({ message: 'Impossible de contacter le serveur' });
        };

        xhr.open('GET', this.URL_API);
        xhr.send();
    },

    /**
     * Enregistre un nouveau contact sur le téléphone (Cordova).
     * @param {Object}   donnees - { nom, telephone, email, organisation }
     * @param {Function} succes  - Callback en cas de succès
     * @param {Function} erreur  - Callback en cas d'erreur
     */
    enregistrer(donnees, succes, erreur) {
        if (!navigator.contacts) {
            erreur({ message: 'Sauvegarde disponible uniquement sur appareil réel.' });
            return;
        }

        const contact = navigator.contacts.create();

        // Nom
        const objetNom = new ContactName();
        objetNom.formatted = donnees.nom;
        contact.displayName = donnees.nom;
        contact.name = objetNom;

        // Téléphone
        contact.phoneNumbers = [new ContactField('mobile', donnees.telephone, true)];

        // Email (optionnel)
        if (donnees.email) {
            contact.emails = [new ContactField('home', donnees.email, true)];
        }

        // Organisation (optionnel)
        if (donnees.organisation) {
            const org = new ContactOrganization();
            org.name = donnees.organisation;
            contact.organizations = [org];
        }

        contact.save(succes, erreur);
    },

    /**
     * Supprime un contact du téléphone par son nom (Cordova).
     * @param {string}   nom     - Nom du contact à supprimer
     * @param {Function} succes  - Callback en cas de succès
     * @param {Function} erreur  - Callback en cas d'erreur
     */
    supprimer(nom, succes, erreur) {
        if (!navigator.contacts) {
            erreur({ message: 'Suppression disponible uniquement sur appareil réel.' });
            return;
        }

        const options = new ContactFindOptions();
        options.filter   = nom;
        options.multiple = false;

        navigator.contacts.find(['displayName'], function(contacts) {
            if (contacts.length > 0) {
                contacts[0].remove(succes, erreur);
            } else {
                erreur({ message: 'Contact introuvable.' });
            }
        }, erreur, options);
    },

    // ----------------------------------------------------------
    //  Méthodes privées d'extraction
    // ----------------------------------------------------------

    _extraireTelephone(c) {
        if (c.telephone) return c.telephone;
        return (c.phoneNumbers && c.phoneNumbers.length > 0)
            ? c.phoneNumbers[0].value
            : 'Non renseigné';
    },

    _extraireEmail(c) {
        if (c.email) return c.email;
        return (c.emails && c.emails.length > 0)
            ? c.emails[0].value
            : 'Non renseigné';
    },

    _extraireOrganisation(c) {
        if (c.organisation) return c.organisation;
        return (c.organizations && c.organizations.length > 0)
            ? c.organizations[0].name
            : 'Non renseignée';
    },

    _extrairePhoto(c) {
        if (c.photo) return c.photo;
        return (c.photos && c.photos.length > 0)
            ? c.photos[0].value
            : 'img/contact-1.png';
    },
};
