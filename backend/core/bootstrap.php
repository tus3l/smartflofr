<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

session_set_cookie_params([
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => isset($_SERVER['HTTPS'])
]);

session_start();


function jsonResponse(
    array $data,
    int $status = 200
): never {

    http_response_code($status);

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES
    );

    exit;
}


function getJsonBody(): array
{
    $raw =
        file_get_contents('php://input');

    if (!$raw) {
        return [];
    }

    $data =
        json_decode(
            $raw,
            true
        );

    return is_array($data)
        ? $data
        : [];
}


function normalizeIdentifier(
    string $identifier
): array {

    $identifier =
        trim($identifier);


    /*
     * EMAIL
     */

    if (
        filter_var(
            $identifier,
            FILTER_VALIDATE_EMAIL
        )
    ) {

        return [
            'type' => 'email',
            'value' => strtolower($identifier)
        ];
    }


    /*
     * PHONE
     */

    $phone =
        preg_replace(
            '/[^0-9+]/',
            '',
            $identifier
        );


    /*
     * 05xxxxxxxx
     */

    if (
        preg_match(
            '/^05\d{8}$/',
            $phone
        )
    ) {

        $phone =
            '+966' .
            substr(
                $phone,
                1
            );
    }


    /*
     * 9665xxxxxxxx
     */

    if (
        preg_match(
            '/^9665\d{8}$/',
            $phone
        )
    ) {

        $phone =
            '+' . $phone;
    }


    /*
     * +9665xxxxxxxx
     */

    if (
        preg_match(
            '/^\+9665\d{8}$/',
            $phone
        )
    ) {

        return [
            'type' => 'phone',
            'value' => $phone
        ];
    }


    return [
        'type' => null,
        'value' => null
    ];
}