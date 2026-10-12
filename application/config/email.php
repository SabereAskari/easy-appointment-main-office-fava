<?php defined('BASEPATH') or exit('No direct script access allowed');

// Add custom values by settings them to the $config array.
// Example: $config['smtp_host'] = 'smtp.gmail.com';
// @link https://codeigniter.com/user_guide/libraries/email.html

$config['useragent'] = 'Easy!Appointments';
$config['protocol'] = 'smtp';
$config['mailtype'] = 'html'; // or 'text'
$config['smtp_debug'] = '0'; // or '1'
$config['smtp_auth'] = TRUE; //or FALSE for anonymous relay.
$config['smtp_host'] = 'smtp.sendgrid.net';
$config['smtp_user'] = 'apikey'; // SendGrid uses 'apikey' as the username
$config['smtp_pass'] = 'YOUR_SENDGRID_API_KEY_HERE'; // TODO: Replace with your actual SendGrid API key
$config['smtp_crypto'] = 'tls'; // or 'tls'
$config['smtp_port'] = 587;
$config['from_name'] = 'Easy!Appointments';
$config['from_address'] = 'noreply@yourdomain.com'; // TODO: Replace with your verified sender email
$config['reply_to'] = 'noreply@yourdomain.com'; // TODO: Replace with your verified sender email
$config['crlf'] = "\r\n";
$config['newline'] = "\r\n";
