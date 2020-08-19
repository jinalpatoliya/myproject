ALTER TABLE `category` 
ADD COLUMN `category_title` VARCHAR(255) NULL AFTER `updated_at`,
ADD COLUMN `category_description` VARCHAR(800) NULL AFTER `category_title`,
ADD COLUMN `category_keyword` VARCHAR(500) NULL AFTER `category_description`,
ADD COLUMN `category_content` TEXT NULL AFTER `category_keyword`;


ALTER TABLE `temp1`.`question` 
DROP COLUMN `examName`,
CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL COMMENT '		' ,
ADD COLUMN `exam_name` VARCHAR(45) NULL AFTER `updated_at`;


ALTER TABLE `temp1`.`subcategory` 
CHANGE COLUMN `created_at` `created_at` DATETIME NOT NULL COMMENT '	' ,
ADD COLUMN `subcategory_title` VARCHAR(255) NULL AFTER `updated_at`,
ADD COLUMN `subcategory_description` VARCHAR(500) NULL AFTER `subcategory_title`,
ADD COLUMN `subcategory_keyword` VARCHAR(255) NULL AFTER `subcategory_description`,
ADD COLUMN `subcategory_content` TEXT NULL AFTER `subcategory_keyword`;

ALTER TABLE `temp1`.`user` 
ADD COLUMN `role` VARCHAR(255) NULL AFTER `resetlink`;

ALTER TABLE `temp1`.`user` 
ADD COLUMN `pendingstatus` INT NULL DEFAULT 0 AFTER `role`;

ALTER TABLE `temp1`.`question` 
ADD COLUMN `image` LONGBLOB NULL AFTER `updated_at`;


