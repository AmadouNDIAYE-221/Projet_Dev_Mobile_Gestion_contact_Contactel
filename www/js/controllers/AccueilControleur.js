// ============================================================
//  CONTRÔLEUR – js/controllers/AccueilControleur.js
//  Gère la logique de la page d'accueil
// ============================================================
const AccueilControleur = {

    chargerDepuisAPI() {
        const isAndroid = typeof device !== 'undefined' && device.platform === 'Android';
        if (isAndroid) {
            AccueilControleur.chargerDepuisContactsNative();
        } else {
            $(document).one('pageshow', '#pageAccueil', function() {
                AccueilControleur.chargerDepuisAPIWeb();
            });
        }
        },

    chargerDepuisContactsNative() {
        const options = new ContactFindOptions();
        options.multiple = true;
        options.hasPhoneNumber = true;

        // ✅ Ajouter 'name' en plus pour récupérer givenName etc.
        const fields = ['displayName', 'name', 'phoneNumbers', 'emails', 'organizations', 'photos'];

        navigator.contacts.find(
            fields,
            (contacts) => this.contactsTrouves(contacts),
            (error) => this.erreurContacts(error),
            options
        );
    },

    async chargerDepuisAPIWeb() {
        try {
            const res = await fetch('http://localhost/contactel/listerContacts.php');
            if (!res.ok) throw new Error("Erreur HTTP " + res.status);
            const data = await res.json();
            if (!Array.isArray(data)) throw new Error("Réponse invalide");

            const contacts = data.map(c => ({
                displayName: c.displayName || 'Inconnu',
                phoneNumbers: c.phoneNumbers || [],
                emails: c.emails || [],
                organizations: c.organizations || [],
                photos: c.photos || []
            }));

            const listeContacts = document.getElementById('listeContacts');
            VueAccueil.afficherContacts(listeContacts, contacts);

        } catch (err) {
            alert("Erreur chargement : " + err.message);
        }
    },

    contactsTrouves(contacts) {
        const listeContacts = document.getElementById('listeContacts');
        VueAccueil.afficherContacts(listeContacts, contacts);
    },

    erreurContacts(error) {
        alert('Erreur contacts natifs. Code : ' + error.code);
    },

    montrerProfil(contact) {
        ProfilControleur.afficherProfil(contact);
    }
};