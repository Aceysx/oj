CREATE TABLE `paper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` TIMESTAMP default current_timestamp,
  `title` VARCHAR(255),
  `userId` int(11),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
