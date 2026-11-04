CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    type ENUM(
        'match_found', 'match_updated', 'claim_received', 'claim_approved',
        'claim_rejected', 'new_message', 'item_returned', 'otp', 'system', 'warning'
    ) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    reference_type ENUM('lost_item', 'found_item', 'match', 'claim', 'conversation', 'system') DEFAULT NULL,
    reference_id BIGINT UNSIGNED DEFAULT NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    read_at DATETIME DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_notification_user (user_id),
    KEY idx_notification_read (user_id, is_read),
    KEY idx_notification_type (type),
    KEY idx_notification_created (created_at),
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET @migration_sql = IF(
    EXISTS(SELECT 1 FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lost_items' AND COLUMN_NAME = 'admin_status'),
    'SELECT 1',
    'ALTER TABLE lost_items ADD COLUMN admin_status ENUM(''new'',''review'',''strong-match'',''contact'',''verification'',''completed'',''rejected'') NOT NULL DEFAULT ''new'''
);
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;

SET @migration_sql = IF(
    EXISTS(SELECT 1 FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lost_items' AND COLUMN_NAME = 'admin_note'),
    'SELECT 1',
    'ALTER TABLE lost_items ADD COLUMN admin_note TEXT DEFAULT NULL'
);
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;

SET @migration_sql = IF(
    EXISTS(SELECT 1 FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'found_items' AND COLUMN_NAME = 'admin_status'),
    'SELECT 1',
    'ALTER TABLE found_items ADD COLUMN admin_status ENUM(''new'',''review'',''strong-match'',''contact'',''verification'',''completed'',''rejected'') NOT NULL DEFAULT ''new'''
);
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;

SET @migration_sql = IF(
    EXISTS(SELECT 1 FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'found_items' AND COLUMN_NAME = 'admin_note'),
    'SELECT 1',
    'ALTER TABLE found_items ADD COLUMN admin_note TEXT DEFAULT NULL'
);
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;
