<?php

declare(strict_types=1);

require_once __DIR__ . '/../../core/bootstrap.php';
require_once __DIR__ . '/../../core/access-helpers.php';
require_once __DIR__ . '/../../config/database.php';

header('Cache-Control: private, no-store');

$data = requireJsonPost();
$markAll = ($data['all'] ?? false) === true;
$notificationId = null;

if (!$markAll) {
    $notificationId = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT, [
        'options' => ['min_range' => 1]
    ]);
    if ($notificationId === false) {
        jsonResponse([
            'success' => false,
            'message' => 'رقم التنبيه غير صحيح.'
        ], 422);
    }
}

try {
    $pdo = (new Database())->connect();
    $user = requireActiveUser($pdo);
    $userId = (int)$user['id'];

    if ($markAll) {
        $update = $pdo->prepare(
            'UPDATE notifications SET is_read = 1, read_at = NOW()
             WHERE user_id = ? AND is_read = 0'
        );
        $update->execute([$userId]);
    } else {
        $update = $pdo->prepare(
            'UPDATE notifications SET is_read = 1, read_at = NOW()
             WHERE id = ? AND user_id = ? AND is_read = 0'
        );
        $update->execute([$notificationId, $userId]);

        if ($update->rowCount() === 0) {
            $check = $pdo->prepare(
                'SELECT id FROM notifications WHERE id = ? AND user_id = ? LIMIT 1'
            );
            $check->execute([$notificationId, $userId]);
            if (!$check->fetch()) {
                jsonResponse([
                    'success' => false,
                    'message' => 'التنبيه غير موجود.'
                ], 404);
            }
        }
    }

    jsonResponse(['success' => true]);
} catch (PDOException $error) {
    error_log('Unable to mark notifications as read: ' . $error->getMessage());
    jsonResponse([
        'success' => false,
        'message' => 'تعذر تحديث التنبيهات. حاول مرة أخرى.'
    ], 500);
}
