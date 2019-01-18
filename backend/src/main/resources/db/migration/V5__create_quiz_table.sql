CREATE TABLE `quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  `options` text,
  `createTime` TIMESTAMP default current_timestamp,
  `answer` int(1),
  `chapter` VARCHAR(255),
  `level` VARCHAR(20),
  `majorId` int(11),
  `userId` int(11),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
