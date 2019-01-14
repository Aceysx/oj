CREATE TABLE `major` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20),
  `createTime` TIMESTAMP default current_timestamp,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
