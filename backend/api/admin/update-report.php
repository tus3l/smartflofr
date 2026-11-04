<?php

declare(strict_types=1);

require_once __DIR__ . '/../../core/bootstrap.php';
require_once __DIR__ . '/../../core/access-helpers.php';
require_once __DIR__ . '/../../core/report-status.php';
require_once __DIR__ . '/../../config/database.php';

header('Cache-Control: private, no-store');

$data = requireJsonPost();
$type = $data['type'] ?? null;
$reportId = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT, [
    'options' => ['min_range' => 1]
]);
$action = $data['action'] ?? null;

if (!is_string($type) || !reportTable($type) || $reportId === false ||
    !in_array($action, ['status', 'note'], true)) {
    jsonResponse([
        'success' => false,
        'message' => 'بيانات البلاغ غير صحيحة.'
    ], 422);
}

if ($action === 'status') {
    $status = $data['status'] ?? null;
    if (!is_string($status) || !isset(reportStatusLabels()[$status])) {
        jsonResponse([
            'success' => false,
            'message' => 'حالة البلاغ غير صحيحة.'
        ], 422);
    }
} else {
    $note = $data['note'] ?? null;
    if (!is_string($note) || mb_strlen($note) > 5000) {
        jsonResponse([
            'success' => false,
            'message' => 'الملاحظة غير صحيحة أو تتجاوز 5000 حرف.'
        ], 422);
    }
    $note = trim($note);
}

$pdo = null;
try {
    $pdo = (new Database())->connect();
    requireStaffUser($pdo);
    $pdo->beginTransaction();

    if ($action === 'status') {
        $result = updateReportStatus($pdo, $type, $reportId, $status);
    } else {
        $table = reportTable($type);
        $query = $pdo->prepare(
            "SELECT admin_note FROM {$table} WHERE id = ? FOR UPDATE"
        );
        $query->execute([$reportId]);
        $report = $query->fetch();
        $result = null;

        if ($report) {
            $changed = ($report['admin_note'] ?? '') !== $note;
            if ($changed) {
                $update = $pdo->prepare(
                    "UPDATE {$table} SET admin_note = ? WHERE id = ?"
                );
                $update->execute([$note, $reportId]);
            }
            $result = ['note' => $note, 'changed' => $changed];
        }
    }

    if ($result === null) {
        $pdo->rollBack();
        jsonResponse([
            'success' => false,
            'message' => 'البلاغ غير موجود.'
        ], 404);
    }

    $pdo->commit();
    jsonResponse(['success' => true] + $result);
} catch (PDOException $error) {
    if ($pdo && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('Unable to update report: ' . $error->getMessage());
    jsonResponse([
        'success' => false,
        'message' => 'تعذر حفظ تحديث البلاغ. حاول مرة أخرى.'
    ], 500);
}
