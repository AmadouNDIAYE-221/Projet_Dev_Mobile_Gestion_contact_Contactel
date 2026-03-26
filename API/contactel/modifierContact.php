<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$file = "contacts.json";
$contacts = json_decode(file_get_contents($file), true);

$ancienNom = $_POST['ancienNom'] ?? '';
$trouve = false;

foreach ($contacts as &$contact) {
    if ($contact['displayName'] === $ancienNom) {
        $contact['displayName']   = $_POST['nom'] ?? $contact['displayName'];
        $contact['phoneNumbers']  = [["value" => $_POST['telephone'] ?? '']];
        $contact['emails']        = $_POST['email'] ? [["value" => $_POST['email']]] : [];
        $contact['organizations'] = $_POST['organisation'] ? [["name" => $_POST['organisation']]] : [];
        $trouve = true;
        break;
    }
}

if ($trouve) {
    file_put_contents($file, json_encode($contacts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Contact introuvable"]);
}