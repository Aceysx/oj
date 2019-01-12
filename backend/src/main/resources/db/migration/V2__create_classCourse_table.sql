CREATE TABLE `classCourse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(20),
  `endTime` TIMESTAMP default current_timestamp,
  `code` VARCHAR(20),
  `createTime` TIMESTAMP default current_timestamp,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
