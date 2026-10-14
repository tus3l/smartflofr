<?php

declare(strict_types=1);

require_once
    __DIR__ .
    '/../../core/bootstrap.php';

require_once
    __DIR__ .
    '/../../config/database.php';


if (
    $_SERVER['REQUEST_METHOD']
    !==
    'POST'
) {

    jsonResponse(
        [
            'success' => false,
            'message' =>
                'طريقة الطلب غير مسموحة.'
        ],
        405
    );
}


$data =
    getJsonBody();


$identifier =
    trim(
        (string)(
            $data['identifier'] ?? ''
        )
    );


$password =
    (string)(
        $data['password'] ?? ''
    );


$normalized =
    normalizeIdentifier(
        $identifier
    );


if (
    !$normalized['type']
) {

    jsonResponse(
        [
            'success' => false,
            'message' =>
                'رقم الجوال أو البريد الإلكتروني غير صحيح.'
        ],
        422
    );
}


if (
    !$password
) {

    jsonResponse(
        [
            'success' => false,
            'message' =>
                'يرجى إدخال كلمة المرور.'
        ],
        422
    );
}


try {

    $pdo =
        (new Database())
            ->connect();


    if (
        $normalized['type']
        ===
        'email'
    ) {

        $query =
            $pdo->prepare(
                '
                SELECT
                    id,
                    full_name,
                    email,
                    phone,
                    password_hash,
                    role,
                    status

                FROM users

                WHERE email = ?

                LIMIT 1
                '
            );

    } else {

        $query =
            $pdo->prepare(
                '
                SELECT
                    id,
                    full_name,
                    email,
                    phone,
                    password_hash,
                    role,
                    status

                FROM users

                WHERE phone = ?

                LIMIT 1
                '
            );

    }


    $query->execute([
        $normalized['value']
    ]);


    $user =
        $query->fetch();


    /*
     * نفس الرسالة للحساب الخاطئ أو الباسورد الخاطئ.
     */

    if (
        !$user ||
        !password_verify(
            $password,
            $user['password_hash']
        )
    ) {

        jsonResponse(
            [
                'success' => false,
                'message' =>
                    'بيانات تسجيل الدخول غير صحيحة.'
            ],
            401
        );
    }


    if (
        $user['status']
        !==
        'active'
    ) {

        jsonResponse(
            [
                'success' => false,
                'message' =>
                    'هذا الحساب غير متاح حالياً.'
            ],
            403
        );
    }


    session_regenerate_id(
        true
    );


    $_SESSION['user_id'] =
        (int)$user['id'];


    $_SESSION['role'] =
        $user['role'];


    /*
     * تحديث آخر تسجيل دخول.
     */

    $update =
        $pdo->prepare(
            '
            UPDATE users
            SET last_login_at = NOW()
            WHERE id = ?
            '
        );


    $update->execute([
        $user['id']
    ]);


    jsonResponse(
        [
            'success' => true,

            'message' =>
                'تم تسجيل الدخول بنجاح.',

            'user' => [
                'id' =>
                    (int)$user['id'],

                'name' =>
                    $user['full_name'],

                'email' =>
                    $user['email'],

                'phone' =>
                    $user['phone'],

                'role' =>
                    $user['role']
            ]
        ]
    );


} catch (PDOException $error) {

    jsonResponse(
        [
            'success' => false,
            'message' =>
                'حدث خطأ أثناء تسجيل الدخول.'
        ],
        500
    );
}