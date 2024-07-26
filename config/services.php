<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain'   => env('MAILGUN_DOMAIN'),
        'secret'   => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme'   => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key'    => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'facebook' => [
        'client_id'     => env('SOCIALITE_FACEBOOK_CLIENT_ID'),
        'client_secret' => env('SOCIALITE_FACEBOOK_CLIENT_SECRET'),
        'redirect'      => env('SOCIALITE_FACEBOOK_CLIENT_REDIRECT'),
    ],

    'twitter' => [
        'client_id'     => env('SOCIALITE_TWITTER_CLIENT_ID'),
        'client_secret' => env('SOCIALITE_TWITTER_CLIENT_SECRET'),
        'redirect'      => env('SOCIALITE_TWITTER_CLIENT_REDIRECT'),
    ],

    'linkedin' => [
        'client_id'     => env('SOCIALITE_LINKEDIN_CLIENT_ID'),
        'client_secret' => env('SOCIALITE_LINKEDIN_CLIENT_SECRET'),
        'redirect'      => env('SOCIALITE_LINKEDIN_CLIENT_REDIRECT'),
    ],

    'google' => [
        'translate' => [
            'key' => env('GOOGLE_TRANSLATE_API_KEY'),
        ],
        'client_id'     => env('SOCIALITE_GOOGLE_CLIENT_ID'),
        'client_secret' => env('SOCIALITE_GOOGLE_CLIENT_SECRET'),
        'redirect'      => env('SOCIALITE_GOOGLE_CLIENT_REDIRECT'),
    ],

    'github' => [
        'client_id'     => env('SOCIALITE_GITHUB_CLIENT_ID'),
        'client_secret' => env('SOCIALITE_GITHUB_CLIENT_SECRET'),
        'redirect'      => env('SOCIALITE_GITHUB_CLIENT_REDIRECT'),
    ],

    'gitlab' => [
        'client_id'     => env('SOCIALITE_GITLAB_CLIENT_ID'),
        'client_secret' => env('SOCIALITE_GITLAB_CLIENT_SECRET'),
        'redirect'      => env('SOCIALITE_GITLAB_CLIENT_REDIRECT'),
    ],

    'bitbucket' => [
        'client_id'     => env('SOCIALITE_BITBUCKET_CLIENT_ID'),
        'client_secret' => env('SOCIALITE_BITBUCKET_CLIENT_SECRET'),
        'redirect'      => env('SOCIALITE_BITBUCKET_CLIENT_REDIRECT'),
    ],

    'recaptcha' => [
        'key'    => env('RECAPTCHA_KEY'),
        'secret' => env('RECAPTCHA_SECRET'),
    ],

    'twilio' => [
        'username'        => env('TWILIO_USERNAME'),
        'password'        => env('TWILIO_PASSWORD'),
        'auth_token'      => env('TWILIO_AUTH_TOKEN'),
        'account_sid'     => env('TWILIO_ACCOUNT_SID'),
        'from'            => env('TWILIO_FROM'),
        'alpha_sender'    => env('TWILIO_ALPHA_SENDER'),
        'debug_to'        => env('TWILIO_DEBUG_TO'),
        'sms_service_sid' => env('TWILIO_SMS_SERVICE_SID'),
    ],

    'panel_api' => [
        'base_url' => env('PANEL_API_BASE_URL'),
    ],
];
