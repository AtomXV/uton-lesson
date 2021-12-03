CREATE DATABASE IF NOT EXISTS uton CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE uton;

create table sensorData
(
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    device_id   varchar(24)                           null,
    data        varchar(1000)                       null,
    tx_hash     char(70)                                null,
    db_time     timestamp default CURRENT_TIMESTAMP null,
    device_time char(24)                            null,
        unique (tx_hash)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据上链记录';