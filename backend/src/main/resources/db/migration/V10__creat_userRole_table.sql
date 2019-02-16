CREATE TABLE `userRole`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11),
  `roleId` int(11),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;