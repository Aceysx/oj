CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20),
  `createTime` TIMESTAMP default current_timestamp,
  `password` VARCHAR(20),
  `available` int(1) default 1,
  `name` VARCHAR(20),
  `phone` VARCHAR (11),
  `email` VARCHAR (50),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
