-- CreateTable
CREATE TABLE `board` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `column` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `board_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NULL,
    `column_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `column` ADD CONSTRAINT `column_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_column_id_fkey` FOREIGN KEY (`column_id`) REFERENCES `column`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
