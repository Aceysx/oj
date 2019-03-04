CREATE TABLE `reviewQuiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` TIMESTAMP default current_timestamp,
  `classCourseId` int(11),
  `paperId` int(11),
  `userId` int(11),
  `score` float,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
