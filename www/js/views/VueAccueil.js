// ============================================================
//  VUE – js/views/VueAccueil.js
//  Gère le rendu de la page d'accueil (liste des contacts)
// ============================================================

const VueAccueil = {
    _contacts: [], // stockage interne

    afficherContacts(listeContacts, contacts) {
        this._contacts = contacts; // on garde la référence
        let html = '';

        contacts.forEach((contact, index) => {
            const phone = (contact.phoneNumbers && contact.phoneNumbers[0])
                ? contact.phoneNumbers[0].value : 'Pas de numéro';
            const photo = (contact.photos && contact.photos[0])
                ? contact.photos[0].value : 'img/contact-1.png';

            // On passe juste l'index — plus de JSON dans le onclick
            html += `
            <li>
                <a href="#" class="lien-contact" data-index="${index}">
                    <img src="${photo}">
                    <h2>${contact.displayName || 'Inconnu'}</h2>
                    <p>${phone}</p>
                </a>
            </li>`;
        });

        listeContacts.innerHTML = html;
        try { $(listeContacts).listview('refresh'); } catch(e) {}

        // Bind des clics après injection du HTML
        $(listeContacts).find('.lien-contact').off('click').on('click', function(e) {
            e.preventDefault();
            const idx = $(this).data('index');
            AccueilControleur.montrerProfil(VueAccueil._contacts[idx]);
        });
    }
};