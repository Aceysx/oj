CREATE TABLE `quizSubmission` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `classCourseId` int(11),
  `paperId` int(11),
  `userId` int(11),
  `quizId` int(11),
  `answer` int(1),
  `isCorrect` int(1) ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
