<?php
// contact-form.php - Script pour traiter le formulaire de contact
// À placer dans le dossier public_html de Hostinger

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données JSON
$input = json_decode(file_get_contents('php://input'), true);

// Validation des données
if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Données manquantes']);
    exit;
}

$name = trim($input['name']);
$email = trim($input['email']);
$subject = isset($input['subject']) ? trim($input['subject']) : 'Nouveau message du site';
$message = trim($input['message']);

// Validation basique
if (strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['error' => 'Le nom doit contenir au moins 2 caractères']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Adresse email invalide']);
    exit;
}

if (strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(['error' => 'Le message doit contenir au moins 10 caractères']);
    exit;
}

// Configuration de l'email
// ✅ L'adresse email de destination est configurée
$to = 'contact@medievaltower.com';

$email_subject = "Nouveau message de $name - $subject";

// Construction du contenu de l'email
$email_body = "Vous avez reçu un nouveau message du site Médiéval Tower.\n\n";
$email_body .= "Détails du message :\n";
$email_body .= "Nom : $name\n";
$email_body .= "Email : $email\n";
$email_body .= "Sujet : $subject\n";
$email_body .= "Message :\n$message\n";
$email_body .= "\n---\n";
$email_body .= "Ce message a été envoyé depuis le formulaire de contact du site.\n";
$email_body .= "Date : " . date('d/m/Y H:i:s') . "\n";

// Headers de l'email
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoi de l'email
$mail_sent = mail($to, $email_subject, $email_body, $headers);

if ($mail_sent) {
    // Sauvegarder dans un fichier log
    $log_entry = date('Y-m-d H:i:s') . " - $name ($email) - $subject\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de l\'envoi de l\'email']);
}
?> 