<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Chemin vers le fichier JSON
$file = "contacts.json";

// Vérifier si le fichier existe
if (file_exists($file)) {

    // Lire le contenu du fichier
    $contacts = file_get_contents($file);

    echo $contacts;

} else {

    echo json_encode([
        "error" => "Fichier contacts.json introuvable"
    ]);
}