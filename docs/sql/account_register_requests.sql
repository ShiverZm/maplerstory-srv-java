CREATE TABLE IF NOT EXISTS `account_register_requests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password_sha1` VARCHAR(128) NOT NULL,
  `status` VARCHAR(16) NOT NULL DEFAULT 'PENDING',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewed_at` TIMESTAMP NULL DEFAULT NULL,
  `review_note` VARCHAR(255) DEFAULT NULL,
  `request_ip` VARCHAR(64) DEFAULT NULL,
  `reviewer_ip` VARCHAR(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_register_username_status` (`username`, `status`),
  KEY `idx_register_status_created` (`status`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
