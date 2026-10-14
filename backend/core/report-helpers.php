<?php

declare(strict_types=1);


function requireAuthenticatedUser(): int
{
    if (
        !isset($_SESSION['user_id']) ||
        !is_numeric($_SESSION['user_id'])
    ) {
        jsonResponse([
            'success' => false,
            'message' => 'يجب تسجيل الدخول أولاً.'
        ], 401);
    }

    return (int)$_SESSION['user_id'];
}


function nullableString(
    mixed $value
): ?string {

    if ($value === null) {
        return null;
    }

    $value = trim((string)$value);

    return $value === ''
        ? null
        : $value;
}


function nullableFloat(
    mixed $value
): ?float {

    if (
        $value === null ||
        $value === ''
    ) {
        return null;
    }

    if (!is_numeric($value)) {
        return null;
    }

    return (float)$value;
}


function getCategoryId(
    PDO $pdo,
    string $categorySlug
): int {

    $map = [
        'animal'      => 'Pets',
        'electronics' => 'Electronics',
        'wallets'     => 'Wallets',
        'keys'        => 'Keys',
        'documents'   => 'Documents',
        'jewelry'     => 'Jewelry',
        'clothes'     => 'Clothing',
        'personal'    => 'Personal Items',
        'sports'      => 'Sports',
        'toys'        => 'Toys',
        'other'       => 'Other'
    ];


    if (
        !isset($map[$categorySlug])
    ) {
        throw new RuntimeException(
            'Invalid category.'
        );
    }


    $query =
        $pdo->prepare(
            '
            SELECT id
            FROM categories
            WHERE name_en = ?
            LIMIT 1
            '
        );


    $query->execute([
        $map[$categorySlug]
    ]);


    $row =
        $query->fetch();


    if (!$row) {
        throw new RuntimeException(
            'Category not found.'
        );
    }


    return (int)$row['id'];
}


function uploadItemImage(
    array $file
): ?string {

    if (
        !isset($file['error']) ||
        $file['error'] === UPLOAD_ERR_NO_FILE
    ) {
        return null;
    }


    if (
        $file['error'] !== UPLOAD_ERR_OK
    ) {
        throw new RuntimeException(
            'فشل رفع الصورة.'
        );
    }


    $maxSize =
        8 * 1024 * 1024;


    if (
        $file['size'] > $maxSize
    ) {
        throw new RuntimeException(
            'حجم الصورة يجب ألا يتجاوز 8MB.'
        );
    }


    $finfo =
        new finfo(
            FILEINFO_MIME_TYPE
        );


    $mime =
        $finfo->file(
            $file['tmp_name']
        );


    $allowed = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp'
    ];


    if (
        !isset($allowed[$mime])
    ) {
        throw new RuntimeException(
            'نوع الصورة غير مدعوم. استخدم JPG أو PNG أو WEBP.'
        );
    }


    $extension =
        $allowed[$mime];


    $filename =
        bin2hex(
            random_bytes(20)
        ) .
        '.' .
        $extension;


    $projectRoot =
        dirname(
            __DIR__,
            2
        );


    $uploadDirectory =
        $projectRoot .
        DIRECTORY_SEPARATOR .
        'uploads' .
        DIRECTORY_SEPARATOR .
        'items';


    if (
        !is_dir(
            $uploadDirectory
        )
    ) {
        if (
            !mkdir(
                $uploadDirectory,
                0755,
                true
            ) &&
            !is_dir(
                $uploadDirectory
            )
        ) {
            throw new RuntimeException(
                'تعذر إنشاء مجلد الصور.'
            );
        }
    }


    $destination =
        $uploadDirectory .
        DIRECTORY_SEPARATOR .
        $filename;


    if (
        !move_uploaded_file(
            $file['tmp_name'],
            $destination
        )
    ) {
        throw new RuntimeException(
            'تعذر حفظ الصورة.'
        );
    }


    return
        'uploads/items/' .
        $filename;
}


function buildItemTitle(
    ?string $itemType,
    ?string $brand,
    string $fallback
): string {

    $parts = [];


    if ($itemType) {
        $parts[] = $itemType;
    }


    if (
        $brand &&
        $brand !== 'other'
    ) {
        $parts[] = $brand;
    }


    if (
        count($parts) === 0
    ) {
        return $fallback;
    }


    return implode(
        ' - ',
        $parts
    );
}