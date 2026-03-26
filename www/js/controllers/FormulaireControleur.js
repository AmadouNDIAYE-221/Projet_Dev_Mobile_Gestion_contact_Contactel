// ============================================================
//  CONTRÔLEUR – js/controllers/FormulaireControleur.js
//  Gère la logique du formulaire ajout / modification
// ============================================================

const FormulaireControleur = {

    contactCourant: null, // contact Android natif ou objet API

    recupererValeursFormulaire() {
        return {
            nom: document.getElementById('champNom').value,
            telephone: document.getElementById('champTelephone').value,
            email: document.getElementById('champEmail').value,
            organisation: document.getElementById('champOrganisation').value
        };
    },

    remplirFormulaire(contact) {
        document.getElementById('champNom').value = contact.displayName || '';
        document.getElementById('champTelephone').value = (contact.phoneNumbers && contact.phoneNumbers[0]?.value) || '';
        document.getElementById('champEmail').value = (contact.emails && contact.emails[0]?.value) || '';
        document.getElementById('champOrganisation').value = (contact.organizations && contact.organizations[0]?.name) || '';
    },

    viderFormulaire() {
        document.getElementById('champNom').value = '';
        document.getElementById('champTelephone').value = '';
        document.getElementById('champEmail').value = '';
        document.getElementById('champOrganisation').value = '';
        this.contactCourant = null;
    },

enregistrerContact() {
    const valeurs = this.recupererValeursFormulaire();
    if (!valeurs.nom || !valeurs.telephone) { 
        alert("Nom et téléphone obligatoires"); 
        return; 
    }

    // Même détection fiable que partout ailleurs
    const isAndroid = typeof device !== 'undefined' && device.platform === 'Android';

    if (isAndroid) {
        // Android natif uniquement
    if (this.contactCourant) {
        let c = this.contactCourant;

        // Nom
        c.displayName = valeurs.nom;
        if (!c.name) c.name = new ContactName();
        c.name.formatted = valeurs.nom;
        c.name.givenName = valeurs.nom;

        // Téléphone — vider puis recréer
        if (!c.phoneNumbers) c.phoneNumbers = [];
        if (c.phoneNumbers.length > 0) {
            // Modifier l'entrée existante au lieu d'en créer une nouvelle
            c.phoneNumbers[0].value = valeurs.telephone;
            c.phoneNumbers[0].type = 'mobile';
            c.phoneNumbers[0].pref = true;
        } else {
            c.phoneNumbers = [new ContactField('mobile', valeurs.telephone, true)];
        }

        // Email
        if (!c.emails) c.emails = [];
        if (valeurs.email) {
            if (c.emails.length > 0) {
                c.emails[0].value = valeurs.email;
            } else {
                c.emails = [new ContactField('home', valeurs.email, true)];
            }
        } else {
            c.emails = [];
        }

        // Organisation — même approche
        if (!c.organizations) c.organizations = [];
        if (valeurs.organisation) {
            if (c.organizations.length > 0) {
                c.organizations[0].name = valeurs.organisation;
            } else {
                c.organizations = [new ContactOrganization({ name: valeurs.organisation })];
            }
        } else {
            c.organizations = [];
        }

        c.save(
            () => {
                alert("Contact modifié !");
                this.viderFormulaire();
                $(document).one('pageshow', '#pageAccueil', function () {
                    AccueilControleur.chargerDepuisContactsNative();
                });
                $.mobile.changePage('#pageAccueil');
            },
            (err) => alert("Erreur modification : " + err.code)
        );

        } else {
            const contact = navigator.contacts.create();
            
            // Nom
            contact.displayName = valeurs.nom;
            const nameObj = new ContactName();
            nameObj.formatted = valeurs.nom;
            nameObj.givenName = valeurs.nom;
            contact.name = nameObj;

            // Téléphone
            contact.phoneNumbers = [new ContactField('mobile', valeurs.telephone, true)];

            // Email
            if (valeurs.email) {
                contact.emails = [new ContactField('home', valeurs.email, true)];
            }

            // Organisation — ne pas passer un objet dans le constructeur
            if (valeurs.organisation) {
                const org = new ContactOrganization();
                org.name = valeurs.organisation;  // assigner après création
                org.type = 'Company';
                contact.organizations = [org];
            }

            contact.save(
                () => {
                    alert("Contact créé !");
                    this.viderFormulaire();
                    $(document).one('pageshow', '#pageAccueil', function () {
                        AccueilControleur.chargerDepuisContactsNative();
                    });
                    $.mobile.changePage('#pageAccueil');
                },
                (err) => alert("Erreur ajout : " + err.code)
            );
        }

    } else {
        // Navigateur — modification ou création via API Web
        if (this.contactCourant) {
            // Modifier dans le JSON via PHP
            const formData = new FormData();
            formData.append('ancienNom', this.contactCourant.displayName);
            formData.append('nom', valeurs.nom);
            formData.append('telephone', valeurs.telephone);
            formData.append('email', valeurs.email);
            formData.append('organisation', valeurs.organisation);

            fetch('http://localhost/contactel/modifierContact.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Contact modifié !");
                    this.viderFormulaire();
                    $(document).one('pageshow', '#pageAccueil', function() {
                        AccueilControleur.chargerDepuisAPIWeb();
                    });
                    $.mobile.changePage('#pageAccueil');
                } else {
                    alert("Erreur : " + (data.message || "Inconnue"));
                }
            })
            .catch(err => alert("Erreur réseau : " + err.message));

        } else {
            // Créer via PHP
            const formData = new FormData();
            formData.append('nom', valeurs.nom);
            formData.append('telephone', valeurs.telephone);
            formData.append('email', valeurs.email);
            formData.append('organisation', valeurs.organisation);

            fetch('http://localhost/contactel/ajouterContact.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Contact ajouté !");
                    this.viderFormulaire();
                    $(document).one('pageshow', '#pageAccueil', function() {
                        AccueilControleur.chargerDepuisAPIWeb();
                    });
                    $.mobile.changePage('#pageAccueil');
                } else {
                    alert("Erreur : " + (data.message || "Inconnue"));
                }
            })
            .catch(err => alert("Erreur réseau : " + err.message));
        }
    }
}
}

