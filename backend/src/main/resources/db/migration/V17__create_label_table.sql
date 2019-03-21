CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pictureId` int(11),
  `fill` VARCHAR(200),
  `title` VARCHAR(255),
  `position` VARCHAR(255),
  `createTime` TIMESTAMP default current_timestamp,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
