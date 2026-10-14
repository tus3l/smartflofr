<?php

declare(strict_types=1);

require_once
    __DIR__ .
    '/../../core/bootstrap.php';

require_once
    __DIR__ .
    '/../../config/database.php';


if (
    !isset(
        $_SESSION['user_id']
    )
) {

    jsonResponse(
        [
            'success' => false,
            'authenticated' => false
        ],
        401
    );
}


try {

    $pdo =
        (new Database())
            ->connect();


    $query =
        $pdo->prepare(
            '
            SELECT
                id,
                full_name,
                email,
                phone,
                role,
                status

            FROM users

            WHERE id = ?

            LIMIT 1
            '
        );


    $query->execute([
        $_SESSION['user_id']
    ]);


    $user =
        $query->fetch();


    if (
        !$user ||
        $user['status'] !== 'active'
    ) {

        session_destroy();


        jsonResponse(
            [
                'success' => false,
                'authenticated' => false
            ],
            401
        );
    }


    jsonResponse(
        [
            'success' => true,

            'authenticated' => true,

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
                'تعذر جلب بيانات المستخدم.'
        ],
        500
    );
}