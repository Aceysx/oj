CREATE TABLE `picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200),
  `url` VARCHAR(255),
  `description` text,
  `userId` int(11),
  `chapter` VARCHAR(255),
  `createTime` TIMESTAMP default current_timestamp,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
