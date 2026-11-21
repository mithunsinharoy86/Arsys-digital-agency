<?php
// Prevent any PHP notices/warnings from corrupting the JSON output
error_reporting(0);
ini_set('display_errors', '0');

// Set JSON response headers and CORS
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed. Only POST is accepted.']);
    exit;
}

// Read raw JSON input or fallback to $_POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// 1. Anti-spam honeypot checks (silently accept bot submissions)
if (!empty($data['website_url']) || !empty($data['company_website_url'])) {
    echo json_encode([
        'ok' => true,
        'message' => 'Consultation enquiry received successfully.',
    ]);
    exit;
}

// 2. Sanitize inputs
$name    = isset($data['name']) ? trim(strip_tags((string)$data['name'])) : '';
$email   = isset($data['email']) ? trim(filter_var((string)$data['email'], FILTER_SANITIZE_EMAIL)) : '';
$company = isset($data['company']) ? trim(strip_tags((string)$data['company'])) : '';
$service = isset($data['service']) ? trim(strip_tags((string)$data['service'])) : 'General Consultation';
$market  = isset($data['market']) ? trim(strip_tags((string)$data['market'])) : 'United States / United Kingdom';
$message = isset($data['message']) ? trim(strip_tags((string)$data['message'])) : '';
$timestamp = date('c');

// 3. Validation
if (strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please provide a valid name (at least 2 characters).']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please provide a valid business email address.']);
    exit;
}

if (strlen($message) < 5) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please share a brief summary of your project goals (at least 5 characters).']);
    exit;
}

$recipient = 'admin@klyroworks.com';
$subject = "New Klyro Works Consultation: " . $name . " - " . $service;

// 4. Record to secure server-side storage (data/enquiries.json and data/enquiries.log)
$enquiryRecord = [
    'id'        => uniqid('enq_', true),
    'name'      => $name,
    'email'     => $email,
    'company'   => $company,
    'service'   => $service,
    'market'    => $market,
    'message'   => $message,
    'timestamp' => $timestamp,
    'ip'        => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
];

$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

// Protect data directory from direct web access
$dataHtaccess = $dataDir . '/.htaccess';
if (!file_exists($dataHtaccess)) {
    @file_put_contents($dataHtaccess, "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n");
}

$enquiriesFile = $dataDir . '/enquiries.json';
$existing = [];
if (file_exists($enquiriesFile)) {
    $content = @file_get_contents($enquiriesFile);
    if ($content) {
        $decoded = @json_decode($content, true);
        if (is_array($decoded)) {
            $existing = $decoded;
        }
    }
}
$existing[] = $enquiryRecord;
@file_put_contents($enquiriesFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

// Also append to a plain readable text log
$logFile = $dataDir . '/enquiries.log';
$logEntry = sprintf(
    "[%s] ID: %s | NAME: %s | EMAIL: %s | CO: %s | SERVICE: %s | MARKET: %s\nMESSAGE:\n%s\n------------------------------------------------------------\n",
    $timestamp, $enquiryRecord['id'], $name, $email, $company, $service, $market, $message
);
@file_put_contents($logFile, $logEntry, FILE_APPEND);

// 5. Build clean HTML Email for delivery
$emailHtml = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px;'>";
$emailHtml .= "<div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);'>";
$emailHtml .= "<div style='background: #0f172a; padding: 24px; color: #ffffff;'>";
$emailHtml .= "<h1 style='margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;'>Klyro<span style='color: #10b981;'>WORKS</span></h1>";
$emailHtml .= "<p style='margin: 6px 0 0 0; font-size: 14px; color: #94a3b8;'>New Website Consultation Request</p>";
$emailHtml .= "</div>";
$emailHtml .= "<div style='padding: 24px;'>";
$emailHtml .= "<table style='width: 100%; border-collapse: collapse;'>";
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; width: 140px; color: #64748b;'>Prospect Name:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;'>" . htmlspecialchars($name) . "</td></tr>";
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Work Email:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9;'><a href='mailto:" . htmlspecialchars($email) . "' style='color: #2563eb; text-decoration: none; font-weight: 600;'>" . htmlspecialchars($email) . "</a></td></tr>";
if (!empty($company)) {
    $emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Company:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;'>" . htmlspecialchars($company) . "</td></tr>";
}
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Service Focus:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #059669;'>" . htmlspecialchars($service) . "</td></tr>";
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Target Market:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;'>" . htmlspecialchars($market) . "</td></tr>";
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Date / Time:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;'>" . htmlspecialchars($timestamp) . "</td></tr>";
$emailHtml .= "</table>";
$emailHtml .= "<div style='margin-top: 20px;'>";
$emailHtml .= "<p style='font-weight: 600; color: #64748b; margin: 0 0 8px 0;'>Project Goals & Challenges:</p>";
$emailHtml .= "<div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 15px; color: #334155; white-space: pre-wrap;'>" . nl2br(htmlspecialchars($message)) . "</div>";
$emailHtml .= "</div>";
$emailHtml .= "<div style='margin-top: 24px; text-align: center;'>";
$emailHtml .= "<a href='mailto:" . htmlspecialchars($email) . "?subject=Re:%20Klyro%20Works%20Consultation%20-%20" . urlencode($service) . "' style='display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;'>Reply Directly to " . htmlspecialchars($name) . "</a>";
$emailHtml .= "</div>";
$emailHtml .= "</div>";
$emailHtml .= "<div style='background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;'>";
$emailHtml .= "This enquiry was submitted from <a href='https://klyroworks.com' style='color: #64748b;'>klyroworks.com</a>.";
$emailHtml .= "</div></div></body></html>";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Klyro Works <noreply@klyroworks.com>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($recipient, $subject, $emailHtml, implode("\r\n", $headers));

// 6. Return standard JSON response
echo json_encode([
    'ok' => true,
    'message' => 'Consultation enquiry received successfully. Our senior strategy team will be in touch within 24 hours.',
    'mailSent' => $mailSent,
    'enquiry' => [
        'id' => $enquiryRecord['id'],
        'name' => $name,
        'service' => $service,
        'timestamp' => $timestamp,
    ],
]);
