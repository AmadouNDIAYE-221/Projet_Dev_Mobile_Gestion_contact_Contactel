// ============================================================
//  APPLICATION – js/app.js
//  Point d'entrée : démarre l'application quand Cordova est prêt
// ============================================================

document.addEventListener('deviceready', function () {
    console.log('Cordova est prêt : Démarrage de ContacTel');

    // Initialiser la page d'accueil (charge les contacts)
    AccueilControleur.initialiser();

}, false);
