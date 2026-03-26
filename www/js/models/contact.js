// models/Contact.js
class Contact {
    constructor(nom, telephone, email = '', organisation = '', photo = 'img/contact-1.png') {
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.organisation = organisation;
        this.photo = photo;
    }

    save(callbackSuccess, callbackError) {
        if (!navigator.contacts) {
            alert("Sauvegarde indisponible dans le navigateur.");
            return;
        }

        let contact = navigator.contacts.create();
        let nameObj = new ContactName();
        nameObj.formatted = this.nom;
        contact.displayName = this.nom;
        contact.name = nameObj;

        contact.phoneNumbers = [new ContactField('mobile', this.telephone, true)];

        if (this.email) contact.emails = [new ContactField('home', this.email, true)];
        if (this.organisation) {
            let orgField = new ContactOrganization();
            orgField.name = this.organisation;
            contact.organizations = [orgField];
        }

        contact.save(callbackSuccess, callbackError);
    }
}