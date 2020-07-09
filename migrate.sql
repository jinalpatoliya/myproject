ALTER TABLE `category` 
ADD COLUMN `category_title` VARCHAR(255) NULL AFTER `updated_at`,
ADD COLUMN `category_description` VARCHAR(800) NULL AFTER `category_title`,
ADD COLUMN `category_keyword` VARCHAR(500) NULL AFTER `category_description`,
ADD COLUMN `category_content` TEXT NULL AFTER `category_keyword`;


ALTER TABLE `temp1`.`question` 
DROP COLUMN `examName`,
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL COMMENT '		' ,
ADD COLUMN `exam_name` VARCHAR(45) NULL AFTER `updated_at`;


