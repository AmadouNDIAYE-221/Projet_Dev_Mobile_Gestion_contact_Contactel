// ============================================================
//  CONTRÔLEUR – js/controllers/ProfilControleur.js
//  Gère la logique de la page profil d'un contact
// ============================================================

const ProfilControleur = {

    afficherProfil(contact) {
        document.getElementById('avatarProfil').src =
            (contact.photos && contact.photos[0]) ? contact.photos[0].value : 'img/contact-1.png';
        document.getElementById('nomProfil').textContent = contact.displayName || '';

        const tel = (contact.phoneNumbers && contact.phoneNumbers[0])
            ? contact.phoneNumbers[0].value : '';
        document.getElementById('telephoneProfil').textContent = tel;
        document.getElementById('telephoneDetailProfil').textContent = tel;
        document.getElementById('emailProfil').textContent =
            (contact.emails && contact.emails[0]) ? contact.emails[0].value : '';
        document.getElementById('organisationProfil').textContent =
            (contact.organizations && contact.organizations[0]) ? contact.organizations[0].name : '';

        this.contactCourant = contact;
        sessionStorage.setItem('contactCourant', JSON.stringify(contact));
        $.mobile.changePage('#pageProfil');
    },

    _getContact() {
        if (this.contactCourant) return this.contactCourant;
        const stored = sessionStorage.getItem('contactCourant');
        return stored ? JSON.parse(stored) : null;
    },

    modifierContact() {
        const contact = this._getContact();
        if (!contact) { alert("Aucun contact sélectionné."); return; }

        FormulaireControleur.contactCourant = contact;

        // remplirFormulaire au lieu de preremplir
        VueFormulaire.remplirFormulaire({
            nom: contact.displayName || '',
            telephone: (contact.phoneNumbers && contact.phoneNumbers[0])
                ? contact.phoneNumbers[0].value : '',
            email: (contact.emails && contact.emails[0])
                ? contact.emails[0].value : '',
            organisation: (contact.organizations && contact.organizations[0])
                ? contact.organizations[0].name : ''
        });

        // Changer le titre du formulaire
        document.getElementById('titreFormulaire').textContent = 'Modifier contact';

        $.mobile.changePage('#pageAjout');
    },

    supprimerContact() {
        const contact = this._getContact();
        if (!contact) { alert("Aucun contact sélectionné."); return; }

        if (!confirm("Voulez-vous vraiment supprimer ce contact ?")) return;

        // Fonction commune après suppression réussie
        const apresSupression = () => {
            this.contactCourant = null;
            sessionStorage.removeItem('contactCourant');
            alert("Contact supprimé !");

            $(document).one('pageshow', '#pageAccueil', function() {
                // Même détection fiable que partout ailleurs
                const isAndroid = typeof device !== 'undefined' && device.platform === 'Android';
                if (isAndroid) {
                    AccueilControleur.chargerDepuisContactsNative();
                } else {
                    AccueilControleur.chargerDepuisAPIWeb();
                }
            });

            $.mobile.changePage('#pageAccueil');
        };

        if (contact.remove) {
            // Android Cordova
            contact.remove(
                () => apresSupression(),
                (err) => alert("Erreur suppression : " + err.code)
            );
        } else {
            // Navigateur — nom envoyé dans le body POST
            const formData = new FormData();
            formData.append('nom', contact.displayName);

            fetch('http://localhost/contactel/supprimerContact.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    apresSupression();
                } else {
                    alert("Erreur suppression : " + (data.message || "Inconnue"));
                }
            })
            .catch(err => alert("Erreur réseau : " + err.message));
        }
    }
};