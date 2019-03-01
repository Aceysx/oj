CREATE TABLE `quizSubmission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` TIMESTAMP default current_timestamp,
  `classCourseId` int(11),
  `paperId` int(11),
  `userId` int(11),
  `quizId` int(11),
  `isCorrect` int(1) ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
