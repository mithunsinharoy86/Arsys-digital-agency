<?php
// Prevent any PHP notices/warnings from corrupting the JSON output
error_reporting(0);
ini_set('display_errors', '0');

// Set JSON response headers and secure CORS
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Strict CORS: only permit requests from klyroworks.com and local development
$allowedOrigins = ['https://klyroworks.com', 'http://klyroworks.com'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? rtrim($_SERVER['HTTP_ORIGIN'], '/') : '';
$isLocal = (!empty($origin) && (strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false));

if (!empty($origin)) {
    if (in_array($origin, $allowedOrigins) || $isLocal) {
        header('Access-Control-Allow-Origin: ' . $origin);
    } else {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Cross-origin request rejected.']);
        exit;
    }
} else {
    // If no origin provided, allow default domain
    header('Access-Control-Allow-Origin: https://klyroworks.com');
}

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

// 1. IP Rate Limiting: Max 5 submissions per 10 minutes per client IP
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$ipClean = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $clientIp);
$rateLimitDir = sys_get_temp_dir() . '/klyro_rate_limit';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0700, true);
}
$rateLimitFile = $rateLimitDir . '/' . md5($ipClean) . '.json';
$rateWindow = 600; // 10 minutes
$maxAttempts = 5;

$now = time();
$attempts = [];
if (file_exists($rateLimitFile)) {
    $content = @file_get_contents($rateLimitFile);
    if ($content) {
        $saved = @json_decode($content, true);
        if (is_array($saved)) {
            $attempts = array_filter($saved, function($t) use ($now, $rateWindow) {
                return ($now - $t) < $rateWindow;
            });
        }
    }
}

if (count($attempts) >= $maxAttempts) {
    http_response_code(429);
    echo json_encode([
        'ok' => false,
        'error' => 'Too many submissions from your connection. Please wait a few minutes before trying again or email admin@klyroworks.com directly.'
    ]);
    exit;
}

$attempts[] = $now;
@file_put_contents($rateLimitFile, json_encode(array_values($attempts)));

// Read raw JSON input or fallback to $_POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// Helper: Strip carriage returns, newlines, and unsafe control chars for email header safety
function cleanHeaderVal($val, $maxLen = 120) {
    if (!is_string($val)) return '';
    $cleaned = str_replace(["\r", "\n", "%0a", "%0d", "\0", "content-type:", "bcc:", "to:", "cc:"], ' ', $val);
    $cleaned = preg_replace('/\s+/', ' ', $cleaned);
    return trim(substr($cleaned, 0, $maxLen));
}

// Helper: Sanitize general body text
function sanitizeText($val, $maxLen = 5000) {
    if (!is_string($val)) return '';
    $cleaned = strip_tags($val);
    $cleaned = str_replace("\0", '', $cleaned);
    return trim(substr($cleaned, 0, $maxLen));
}

// 2. Anti-Spam Detection Engine
$isSpam = false;
$spamReason = '';

// Check 1: Multi-honeypot fields
if (!empty($data['website_url']) || 
    !empty($data['company_website_url']) || 
    !empty($data['phone_verify']) || 
    !empty($data['secondary_email'])) {
    $isSpam = true;
    $spamReason = 'Honeypot field triggered';
}

// Check 2: Submission Speed Trap (minimum 2.5 seconds to fill out the form)
if (!$isSpam && isset($data['_form_rendered_at'])) {
    $renderedAt = floatval($data['_form_rendered_at']);
    $currentTimeMs = microtime(true) * 1000;
    $diffMs = $currentTimeMs - $renderedAt;

    if ($diffMs < 2500) {
        $isSpam = true;
        $spamReason = 'Submitted too quickly (bot speed trap: ' . round($diffMs) . 'ms)';
    } elseif ($diffMs > (4 * 3600 * 1000)) {
        $isSpam = true;
        $spamReason = 'Form token expired (>4 hours old)';
    }
}

// Check 3: Content-based spam heuristics
$rawMessage = isset($data['message']) ? (string)$data['message'] : '';

// 3a. Cyrillic / Russian form blast spam check (XRumer pattern)
if (!$isSpam && !empty($rawMessage)) {
    preg_match_all('/[\p{Cyrillic}]/u', $rawMessage, $cyrillicMatches);
    $cyrillicCount = count($cyrillicMatches[0]);
    $totalLen = mb_strlen($rawMessage);
    if ($totalLen > 0 && ($cyrillicCount / $totalLen) > 0.15) {
        $isSpam = true;
        $spamReason = 'High Cyrillic text density in message';
    }
}

// 3b. Excessive links check
if (!$isSpam && !empty($rawMessage)) {
    preg_match_all('/(https?:\/\/|www\.|\[url|<a\s+href)/i', $rawMessage, $urlMatches);
    if (count($urlMatches[0]) > 2) {
        $isSpam = true;
        $spamReason = 'Excessive URLs in message (' . count($urlMatches[0]) . ' links)';
    }
}

// 3c. Obvious spam keywords
if (!$isSpam && !empty($rawMessage)) {
    $spamKeywords = [
        'casino', 'poker', 'crypto giveaway', 'bitcoin profit', 'viagra', 'cialis',
        'telegram:', 'whatsapp:', 'seo backlinks package', 'guest post offer',
        'earn $', 'make money fast', 'dating site'
    ];
    $lowerMessage = strtolower($rawMessage);
    foreach ($spamKeywords as $kw) {
        if (strpos($lowerMessage, $kw) !== false) {
            $isSpam = true;
            $spamReason = 'Spam keyword matched: ' . $kw;
            break;
        }
    }
}

// 3. Deceptive Honey-Success: If spam is detected, silently absorb without sending email
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0700, true);
}

if ($isSpam) {
    // Log blocked spam for auditing without disturbing inbox or active customer records
    $spamLog = $dataDir . '/spamblocked.log';
    $logLine = sprintf(
        "[%s] BLOCKED (%s) | IP: %s | NAME: %s | EMAIL: %s | MSG: %s\n",
        date('c'),
        $spamReason,
        $clientIp,
        cleanHeaderVal($data['name'] ?? ''),
        cleanHeaderVal($data['email'] ?? ''),
        substr(preg_replace('/\s+/', ' ', $rawMessage), 0, 100)
    );
    @file_put_contents($spamLog, $logLine, FILE_APPEND);

    // Return 200 OK so the automated bot thinks it succeeded and stops retrying
    echo json_encode([
        'ok' => true,
        'message' => 'Consultation enquiry received successfully. Our senior strategy team will be in touch within 24 hours.',
    ]);
    exit;
}

// 4. Sanitize legitimate inputs
$name    = cleanHeaderVal($data['name'] ?? '', 100);
$email   = filter_var(trim((string)($data['email'] ?? '')), FILTER_SANITIZE_EMAIL);
$company = cleanHeaderVal($data['company'] ?? '', 120);
$service = cleanHeaderVal($data['service'] ?? 'General Consultation', 100);
$market  = cleanHeaderVal($data['market'] ?? 'United States / United Kingdom', 100);
$message = sanitizeText($data['message'] ?? '', 5000);
$timestamp = date('c');

// 5. Validation
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

// 6. Record to secure server-side storage (data/enquiries.json and data/enquiries.log)
$enquiryRecord = [
    'id'        => uniqid('enq_', true),
    'name'      => $name,
    'email'     => $email,
    'company'   => $company,
    'service'   => $service,
    'market'    => $market,
    'message'   => $message,
    'timestamp' => $timestamp,
    'ip'        => $clientIp,
    'userAgent' => substr($_SERVER['HTTP_USER_AGENT'] ?? 'unknown', 0, 255),
];

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

// Append to a plain readable text log
$logFile = $dataDir . '/enquiries.log';
$logEntry = sprintf(
    "[%s] ID: %s | NAME: %s | EMAIL: %s | CO: %s | SERVICE: %s | MARKET: %s\nMESSAGE:\n%s\n------------------------------------------------------------\n",
    $timestamp, $enquiryRecord['id'], $name, $email, $company, $service, $market, $message
);
@file_put_contents($logFile, $logEntry, FILE_APPEND);

// 7. Build clean HTML Email for delivery
$emailHtml = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px;'>";
$emailHtml .= "<div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);'>";
$emailHtml .= "<div style='background: #0f172a; padding: 24px; color: #ffffff;'>";
$emailHtml .= "<h1 style='margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;'>Klyro<span style='color: #10b981;'>WORKS</span></h1>";
$emailHtml .= "<p style='margin: 6px 0 0 0; font-size: 14px; color: #94a3b8;'>New Website Consultation Request</p>";
$emailHtml .= "</div>";
$emailHtml .= "<div style='padding: 24px;'>";
$emailHtml .= "<table style='width: 100%; border-collapse: collapse;'>";
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; width: 140px; color: #64748b;'>Prospect Name:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;'>" . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</td></tr>";
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Work Email:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9;'><a href='mailto:" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "' style='color: #2563eb; text-decoration: none; font-weight: 600;'>" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</a></td></tr>";
if (!empty($company)) {
    $emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Company:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;'>" . htmlspecialchars($company, ENT_QUOTES, 'UTF-8') . "</td></tr>";
}
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Service Focus:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #059669;'>" . htmlspecialchars($service, ENT_QUOTES, 'UTF-8') . "</td></tr>";
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Target Market:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;'>" . htmlspecialchars($market, ENT_QUOTES, 'UTF-8') . "</td></tr>";
$emailHtml .= "<tr><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #64748b;'>Date / Time:</td><td style='padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;'>" . htmlspecialchars($timestamp, ENT_QUOTES, 'UTF-8') . "</td></tr>";
$emailHtml .= "</table>";
$emailHtml .= "<div style='margin-top: 20px;'>";
$emailHtml .= "<p style='font-weight: 600; color: #64748b; margin: 0 0 8px 0;'>Project Goals & Challenges:</p>";
$emailHtml .= "<div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 15px; color: #334155; white-space: pre-wrap;'>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</div>";
$emailHtml .= "</div>";
$emailHtml .= "<div style='margin-top: 24px; text-align: center;'>";
$emailHtml .= "<a href='mailto:" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "?subject=Re:%20Klyro%20Works%20Consultation%20-%20" . urlencode($service) . "' style='display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;'>Reply Directly to " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</a>";
$emailHtml .= "</div>";
$emailHtml .= "</div>";
$emailHtml .= "<div style='background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;'>";
$emailHtml .= "This enquiry was submitted from <a href='https://klyroworks.com' style='color: #64748b;'>klyroworks.com</a>.";
$emailHtml .= "</div></div></body></html>";

// Strict email header construction (CRLF safe)
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Klyro Works <noreply@klyroworks.com>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($recipient, $subject, $emailHtml, implode("\r\n", $headers));

// 8. Return standard JSON response
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
