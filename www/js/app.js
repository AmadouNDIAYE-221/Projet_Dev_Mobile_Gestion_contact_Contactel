// ============================================================
//  APPLICATION – js/app.js
//  Point d'entrée : démarre l'application quand Cordova est prêt
// ============================================================

// deviceready
document.addEventListener('deviceready', function () {
    console.log("deviceready OK");
    console.log("Platform :", device.platform);
    demarrerApp();
}, { once: true }); // { once: true } = se déclenche une seule fois

function demarrerApp() {
    const isAndroid = typeof device !== 'undefined' && device.platform === 'Android';

    if (isAndroid) {
        console.log("→ Android natif");
        $('#btnChargerAPI').hide();
        AccueilControleur.chargerDepuisContactsNative();
    } else {
        console.log("→ Navigateur");
        $('#btnChargerAPI').show();
    }
}

$(document).on('pageshow', '#pageProfil', function () {
    $('#btnModifier').off('click').on('click', function (e) {
        e.preventDefault();
        ProfilControleur.modifierContact();
    });
    $('#btnSupprimer').off('click').on('click', function (e) {
        e.preventDefault();
        ProfilControleur.supprimerContact();
    });
});

$(document).on('pageshow', '#pageAccueil', function () {
    $('#btnChargerAPI').off('click').on('click', function (e) {
        e.preventDefault();
        AccueilControleur.chargerDepuisAPIWeb(); // rafraîchit à chaque clic
    });
});