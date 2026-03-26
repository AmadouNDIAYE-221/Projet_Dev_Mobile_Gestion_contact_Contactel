<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$file = "contacts.json";
$contacts = json_decode(file_get_contents($file), true);

$nom = $_POST['nom'] ?? '';
$avant = count($contacts);

// ✅ Filtrer le contact à supprimer
$contacts = array_values(array_filter($contacts, function($c) use ($nom) {
    return $c['displayName'] !== $nom;
}));

if (count($contacts) < $avant) {
    file_put_contents($file, json_encode($contacts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Contact introuvable"]);
}