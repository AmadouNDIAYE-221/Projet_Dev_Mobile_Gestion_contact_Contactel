<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$file = "contacts.json";
$contacts = json_decode(file_get_contents($file), true);

$nouveau = [
    "displayName"  => $_POST['nom'] ?? '',
    "phoneNumbers" => [["value" => $_POST['telephone'] ?? '']],
    "emails"       => $_POST['email'] ? [["value" => $_POST['email']]] : [],
    "organizations"=> $_POST['organisation'] ? [["name" => $_POST['organisation']]] : [],
    "photos"       => [["value" => "img/contact-1.png"]]
];

$contacts[] = $nouveau;

file_put_contents($file, json_encode($contacts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo json_encode(["success" => true]);